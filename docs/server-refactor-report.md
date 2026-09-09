# Relatório de Análise — Módulo `server/` (QuickOS)

> **Propósito:** Mapear a arquitetura, os componentes e a lógica de negócio do backend atual (TypeScript) para nortear a migração/refatoração para Python.
> **Escopo deste documento:** apenas o módulo `server/` e as dependências diretamente necessárias para entendê-lo (modelo de dados Prisma e schemas de validação Zod).
> **Data:** 2026-09-09 · **Branch:** `iatf`

---

## 1. Panorama geral

O backend é um **servidor Express** que expõe uma API via **tRPC**. Ele é embutido em um app Electron/React (aplicativo desktop de gestão de manutenção industrial — "ordens de serviço" de manutenção preventiva). O banco é **SQLite** com acesso via **Prisma ORM**.

O fluxo de trabalho se passa em semanas de calendário: existem **ações preventivas** que devem ser executadas em determinada semana; quando uma semana é aberta, as ações vencidas geram **Ordens de Serviço (OS)** agrupadas por `(máquina, natureza)`. Executar uma OS registra as "ações tomadas" e agenda a próxima execução de cada ação somando a frequência em semanas.

A camada de rede é **tRPC**, que sobre Express gera `POST /trpc` para cada procedure, com protocolo próprio (sem REST convencional). Há também uma rota HTTP "crua" que renderiza um template EJS (a OS impressa).

### Stack e responsabilidade por camada

| Camada | Tecnologia atual | Papel |
|--------|------------------|-------|
| Servidor HTTP | **Express** + **tRPC** | Roteamento, validação de entrada/saída |
| Validação/contrato | **Zod** (schemas em `schemas/`) | Tipos + validação runtime compartilhada com o front |
| Acesso a dados | **Prisma ORM** → **SQLite** | ORM gerado em `database/client` |
| Datas semanas | `date-fns` | Cálculos de semana/ano ISO |

### Tamanho do módulo (~770 linhas, 8 arquivos)

```
server/
├── index.ts                     (107)  Bootstrap Express + tRPC + rota EJS
├── preventiveOsTools.ts        (225)  Lógica principal de negócio (OS)
├── utils/
│   ├── prisma.ts                 (19)  Instância singleton do Prisma
│   ├── weekTools.ts              (44)  Funções de semana/ano ISO   ← núcleo de datas
│   ├── responseMessages.ts       (19)  Helpers de erro/resposta tRPC
│   └── generateActionsUniqueKey.ts (6) FALSO DUPLICADO (ver seção 5)
└── routers/
    ├── index.ts                  (14)  Monta appRouter raiz
    ├── main.routes.ts            (77)  CRUD mestre: máquinas, naturezas, trabalhadores
    └── preventive.routes.ts     (259)  Procedures de OS e ações preventivas
```

---

## 2. Modelo de dados (referência)

Backend SQLite (ver `prisma/schema.prisma`). As relações mais relevantes para o `server/`:

- **`Machine`** (equipamento): `tag`, `ute`, `technology`.
- **`Nature`** (tipo de manutenção): `name`.
- **`Worker`** (técnico/executor): `registration` (único), `name`, `class`.
- **`PreventiveAction`** (ação preventiva recorrente): `description`, `machineId`, `natureId`, `excution` (sic — "execution"?), `frequency` (semanas), `nextExecution` (string `"YYYY-Www"`), `ignore`. Histórico via `actionsTaken`.
- **`PreventiveActionTaken`** (registro de execução): grava uma "pista" de que a ação foi executada; liga `actionId`+`osId`+`weekCode`+`date`.
- **`PreventiveOS`** (ordem de serviço): agrega ações de uma `(máquina, natureza, semana)`. Chave de unicidade composta:
  `@@unique([machineId, natureId, weekCode, actionsUniqueKey])` — ver [seção 4.5](#45-actionsuniquekey).

O campo mais importante é **`weekCode`**, uma string no padrão ISO `YYYY-Www` (ex.: `2026-W37`). É a "coluna vertebral" de todo o agendamento semanal.

---

## 3. Arquitetura em camadas (separação de componentes)

Para orientar a refatoração, o código atual pode ser decomposto assim (nem sempre bem separado hoje — a lógica de negócio está misturada com os routers):

```
┌─────────────────────────────── Front React (consumidor tRPC) ───────────────────────────────┐
│                                  @trpc/client  (@tanstack/react-query)                        │
└────────────────────────────────────────┬─────────────────────────────────────────────────────┘
                                         │ POST /trpc
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│  CAMADA DE ROTA / TRANSPORTE  (HTTP)                                                         │
│  index.ts           Express: /trpc (tRPC middleware) + rota EJS /createServiceorder/:id      │
│  routers/*.ts       t.router: declara procedures, conecta input→handler                      │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  CAMADA DE VALIDAÇÃO / CONTRATO  (boundary de tipos — zod)                                  │
│  schemas/main.ts, schemas/preventive.ts    → valida entradas/saídas de cada procedure        │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  CAMADA DE NEGÓCIO / SERVIÇO  (regras de domínio)   ← ★ o que precisa virar módulos puros   │
│  preventiveOsTools.ts  assembleServiceOrders() · registerServiceOrders() · executeServiceOrders()│
│  utils/weekTools.ts    cálculos de semana ISO                                                 │
│  utils/responseMessages.ts                                                                │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  CAMADA DE ACESSO A DADOS  (repositório)                                                    │
│  utils/prisma.ts  cliente Prisma singleton                                                  │
│  (as consultas atuais chamam prisma.<modelo> diretamente dentro de services e routers)      │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

> **Observação importante para a migração:** hoje **não há** separação limpa entre "rota/task", "domínio" e "dados". As procedures de `preventive.routes.ts` chamam `prisma.*` diretamente (acesso a dado vazado na rota). Ao portar para Python, abra mão dessa oportunidade: isole em **camadas** (repositories → services → routers) desde o início.

---

## 4. Lógica por trás das funções principais

Aqui estão as funções com maior peso de negócio, o que fazem e por quê.

### 4.1 `assembleServiceOrders()` — montar/carregar O.S. de uma semana
**Definida em** `server/preventiveOsTools.ts:36` → chamada a partir de `preventive.getServiceOrders` em `server/routers/preventive.routes.ts:25`.

**Papel:** dado `{ machine, nature, status, week, year }`, retorna a lista de Ordens de Serviço para aquela semana. Faz **duas coisas distintas** dependendo do `status`:

1. **Geração** (status pendente): percorre todas as combinações de `(máquina × natureza)` que casem com os filtros; busca `PreventiveAction` com `nextExecution == weekCode`; agrupa as ações → chama `registerServiceOrders()` (v. 4.2) que **cria/atualiza** a OS.
2. **Consulta** (status `concluded`/`all`): lê `PreventiveOS` com `concluded: true` daquela semana/máquina/natureza e retorna já montado com relações (`responsible`, `nature`, `machine`, `actionsTaken.action...`).

**Lógica interna destacável:**
- Loop **quadrático** (com `for await ... of` aninhados): combinações máquina×natureza × (busca de ações de cada casa) → potencial gargalo em banco cheio. Em Python, planeje **agregar por query** em vez de N+1.
- `concluded = status == 'true'` — o `status` chega como **string** (`'true'`/`'false'`/`'all'`), não booleano (origem em `schemas/preventive.ts:56`).
- Ao final chama `proofreaderDataBase(weekCode)` (não-destrutiva disparada sem `await` — "fire and forget").

### 4.2 `registerServiceOrders()` — criar/atualizar (upsert) uma OS
**Definida em** `server/preventiveOsTools.ts:120` → chamada apenas por `assembleServiceOrders()`.

**Papel:** faz um **upsert** na `PreventiveOS`. Conecta as ações por id e usa a chave única composta `machineId + natureId + weekCode + actionsUniqueKey` como `where`. Se a OS já existir com as mesmas ações na semana, atualiza; senão, cria.

**Detalhe importante:** o `actionsUniqueKey` (v. 4.5) é derivado do **conjunto de ações**. Como o prisma `connect` nessas `actions` cria uma relação muitos-para-muitos pela tabela intermediária implícita, mudar as ações muda o hash → gera uma **nova** OS em vez de reusar.

### 4.3 `executeServiceOrders()` — concluir/executar uma OS
**Definida em** `server/preventiveOsTools.ts:159` → chamada por `preventive.executeServiceOrders`, `server/routers/preventive.routes.ts:121`.

**Papel:** o coração do ciclo de manutenção. Quando uma OS é executada:
1. Calcula a **duração** (`differenceInMinutes(finishTime - startTime)`, do `date-fns`).
2. `update` da `PreventiveOS`: grava `date`, conecta `responsible` (workers), `duration`, `startTime`, `finishTime`, `concluded: true`.
3. Para **cada ação** da OS (`os.actions`), faz **dois movimentos paralelos/complementares**:
   - **Reagenda** a próxima execução da `PreventiveAction`: soma `frequency` **semanas** a partir de `nextExecution` atual → `incrementWeekYear()` + `weekYearToString()` (v. 4.4).
   - **Registra uma `PreventiveActionTaken`** (linha de histórico) apontando `actionId`, `osId`, `weekCode`, `date`.

> Sequência de *updates* não transacional: 1 update na OS + (por ação) 1 update + 1 create. Sem `$transaction`. **À refatorar:** envolver tudo numa transação atômica (no Python, ex. um contexto de commit único).

### 4.4 Cálculos de semana/ano (ISO)
Todo em `server/utils/weekTools.ts:1-44`. Funções:
- `weekYearStringToNumber("2026-W37")` → `{ week: 37, year: 2026 }` (`weekTools.ts:13`).
- `weekYearToString(37, 2026)` → `"2026-W37"` com zero à esquerda (`weekTools.ts:27`).
- `incrementWeekYear(week, year, delta)` → **soma `delta` semanas** respeitando virada de ano (usa `date-fns` `setISOWeek`/`addWeeks`/`getWeek`/`getYear`) (`weekTools.ts:4`).
- `weekYearToDate(week, year)` → converte para `Date` (**não usada** no `server/` hoje; só exportada).
- `weekYearRegex` = `/\d{4}-W\d{2}/` — o padrão canônico de `weekCode`.

> Regex **tolerante a formato inválido**: `\d{4}-W\d{2}` aceita até `9999-W99`; strings são tratadas numérica e manualmente, não como datas. Em Python, prefira **`datetime.date.fromisocalendar(year, week, 1)`** (ISO nativo) em vez de implementar à mão.

### 4.5 `generateActionsUniqueKey()` — hash do conjunto de ações — (⚠️ duplicado)
Duas versões **idênticas** da mesma função existem:
- `server/utils/generateActionsUniqueKey.ts:3` (importada via alias do próprio arquivo — sem uso direto aparente no app real).
- `server/preventiveOsTools.ts:221` **exporta a mesma função localmente** usada pela `assembleServiceOrders`.

**Papel:** gera uma chave string concatenando cada ação como `A-I{id}/M{machineId}/N{natureId}_`. Serve para **identificar a OS** pela combinação exata de ações → parte da `@@unique` da tabela. Dado `[1,3]` vs `[3,1]` produz chaves distintas, então a **ordem importa** (embora `findMany` retorne por inserção, não garante ordem).

> ⚠️ **Duplicação de código já existente** em código-fonte — oportunidade de consolidar ao migrar. A versão `server/utils/generateActionsUniqueKey.ts:3` parece **morta/removível** (é redundante à interna), com exceção de seu uso como *import do schema tipo*.

### 4.6 `proofreaderDataBase()` — "faxina" de OSs vazias
**Definida em** `server/preventiveOsTools.ts:17` (privada; não exportada). Chamada no final de `assembleServiceOrders` (`:110`) **sem `await`**.

**Papel:** busca todas OS da semana e **deleta as que não têm** nenhuma `action` **nem** nenhuma `actionsTaken`. Ou seja, remove OS "fantasma" criadas por agrupamento mas depois esvaziadas.

> **Possível bug latente:** é chamada sem `await` dentro de `assembleServiceOrders` (fire-and-enterprise) e há um **`forEach(async ...)`** dentro dela. Em `forEach` async, as *deletes* concorrentes não são aguardadas e o tratador corre ao fundo. Migração = transformar em chamada explícita `await` + loop sequencial/PRUNING transactional.

### 4.7 Rotas EJS (renderização de OS impressa)
**Em** `server/index.ts:27` (`useCreateServiceOrder`) e `index.ts:32`.

`GET /createServiceorder/:id` → faz `findUnique` de uma `PreventiveOS` (com `nature/machine/responsible/actions/actionsTaken`), valida com `serviceOrdersSchema` (`index.ts:58`) e renderiza template **`serviceOrder.ejs`**. É um endpoint **REST fora do tRPC**, usado provavelmente pelo app desktop para gerar a OS imprimível.

### 4.8 Endpoints mestre (`main.routes.ts`)
`server/routers/main.routes.ts:11`. Procedures puramente de leitura/consulta direta do Prisma, sem lógica de domínio:
- `getMachines` `:15` → lista máquinas.
- `getNatures` `:24` → lista naturezas.
- `getWorkers` `:36` → lista trabalhadores.
- `getWorkersByRegistration` `:48` → por `registration` única.
- `getWorker` `:64` → por `id`.

---

## 5. Função do `server/preventiveOsTools.ts` com a duplicata / e funções restantes de `preventive.routes.ts`

As procedures **restantes** em `server/routers/preventive.routes.ts` são **CRUD direto de ações/OS** e contagens — aqui está o "mapa de cobertura":

| Router procedure | Arquivo:linha | Tipo | Negócio real? |
|---|---|---|---|
| `getServiceOrders` | `preventive.routes.ts:25` | query | delega → `assembleServiceOrders` (4.1) |
| `getServiceOrderById` | `preventive.routes.ts:38` | query | findUnique + include aninhado |
| `updateServiceOrder` | `preventive.routes.ts:72` | mutation | reimplementa parte de 4.3 **sem** criar `ActionTaken` nem reagendar — cuidado: **divergência semântica** com `executeServiceOrders` (ver 4.9) |
| `deleteServiceOrder` | `preventive.routes.ts:104` | mutation | delete direto |
| `executeServiceOrders` | `preventive.routes.ts:121` | mutation | delega → `executeServiceOrders` (4.3) |
| `getActions` | `preventive.routes.ts:134` | query | listagem com busca + cursor pagination + filtros |
| `createAction` | `preventive.routes.ts:175` | mutation | create `PreventiveAction` |
| `updateAction` | `preventive.routes.ts:190` | mutation | update `PreventiveAction` |
| `deleteAction` | `preventive.routes.ts:209` | mutation | delete `PreventiveAction` |
| `getcountPreventiveOs` | `preventive.routes.ts:224` | query | conta OS `concluded: true/false` por `weekCode` → `{finished, unfinished}` |

### 4.9  ⚠️ Divergência `updateServiceOrder` × `executeServiceOrders`
Há **dois caminhos** que "finalizam" uma OS com efeitos **diferentes**:
- **`executeServiceOrders`** (procedure em `:121` → `executeServiceOrders` 4.3) faz **os dois** efeitos: `responsible` connection **acrescido**, reagenda ações, cria `ActionTaken`.
- **`updateServiceOrder`** (`preventive.routes.ts:72`) apenas marca `concluded`, grava datas/duration e **`responsible: { set: workers }`** — *sem* reagendar, *sem* criar `ActionTaken`, e com `set` (substitui) em vez de `connect` (acrescenta).

**Isso provavelmente é um bug ou caminho obsoleto a eliminar/consolidar na refatoração.** Levantar com o usuário.

---

## 6. Detalhes técnicos relevantes para o port para Python

1. **Transporte tRPC.** O protocolo default `POST /trpc/{procedure}` difere de REST. Para migrar sem reescrever o frontend, avalie: portar para um framework com RPC equivalente, ou reescrever o `@trpc/client` no frontend (maior trabalho). Para "refatorar o backend para Python", decida o contrato de rede.
2. **Validação Zod → em Python:** `zod` ≈ **`pydantic`**. O porte direto é de 1:1 para os schemas `schemas/main.ts` e `schemas/preventive.ts` (`data-first`, válido também como types de runtime). Recomenda-se mover para **schemas pydantic** com regex `weekCode`.
3. **ORM Prisma → em Python:** SQLite + qualquer ORM (SQLAlchemy, `sqlmodel`). O modelo tem `@@unique` composto e um **M:N implícito** (`responsible Worker[]` e `actions PreventiveAction[]`) materializado como tabelas de junção — mapear explicitamente as tabelas pivô (o Prisma nomeia `_PreventiveOSToWorker`, `_PreventiveOSToPreventiveAction`). **`PreventiveActionTaken`** já é explícita.
4. **Datas semanais:** usar **`datetime.isocalendar()`** nativo (equivalente `date-fns` c/ semana ISO) → substitui `weekTools.ts` quase 100% (menos o regex de string).
5. **Transacionalidade.** Hoje sem `$transaction`. Ao portar, **envelopar** `execute` + reagendamento + `ActionTaken` em uma *transação única* para garantir consistência.
6. **Consultas N+1 do `assembleServiceOrders`.** O loop duplo `máquina × natureza` consulta ações de novo a cada iteração. Em Python planeje consultas agregadas/documento.
7. **Scripts/execução**: `package.json` roda o servidor via `bun` (`"server": "tsx watch ./server/index.ts"`). Em Python, institua um runner equivalente (ex.: `uvicorn`), pois é aplicativo empacotado em Electron — atenção a **caminhos absolutos** de `database/app.db` dentro do `asar` (ver `prisma.ts:10` — resolve `__dirname` + offset; comporta dev vs produção).

---

## 7. Resumo da arquitetura — mapeamento sugestivo p/ Python

Abaixo um mapa "como está hoje" → "como sugerido em Python" (não definitivo — apenas base de projeto).

| Função TS (hoje) | Papel de domínio | Equivalente Python sugerido |
|---|---|---|
| Router (procedures) | Orquestração/rpc | `routers/` (FastAPI/APIRouter + `pydantic` nos contratos) |
| `schemas/*.ts` (zod) | Contrato io/runtime | `models/schemas.py` (pydantic) |
| `preventiveOsTools.ts` | Regras de domínio do ciclo semanal | `services/preventive_service.py` |
| `utils/weekTools.ts` | Cálculo semanas ISO | `domain/week.py` (isocalendar) |
| `utils/prisma.ts` | Acesso a dados (SQLite) | `repositories/` + `db.py` (session SQLAlchemy) |
| `utils/responseMessages.ts` | Erros/respostas padrão | `schemas/common.py` + `exceptions.py` |
| `utils/generateActionsUniqueKey.ts` | Chave de concorrência OS (duplicado) | unificar na service; **remover dup.** |
| `routers/index.ts`, `main.routes.ts`, `preventive.routes.ts` | Montagem de rotas | `routers/__init__.py` |
| `index.ts` (aplicação Express + EJS) | Bootstrap + render EJS | `main.py` (FastAPI) + engine jinja2 p/ a OS impressa |

**Regras de domínio centrais a traduzir intactas (as "regras de negócio" que importam):**
- `weekCode` (`YYYY-Www`) como unit de agendamento **[4.4](#44-cálculos-de-semanaano-iso)**.
- Upsert OS pela `@@unique [machineId, natureId, weekCode, actionsUniqueKey]` **[4.2](#42-registerserviceorders--criaratualizar-upsert-uma-os)**.
- Reagendar `nextExecution += frequency` semanas + registrar `ActionTaken` a cada execução **[4.3](#43-executeserviceorders--concluirexecutar-uma-os)**.
- Hash `actionsUniqueKey` para distinguir OS por conjunto de ações **[4.5](#45-generateactionsuniquekey--hash-do-conjunto-de-ações--duplicado)**.
- Limpeza de OS sem ações/histórico **[4.6](#46-proofreaderdatabase--faxina-de-oss-vazias)**.

---

## 8. Riscos / pontos de decisão a confirmar com o usuário antes do port

- [ ] **Rede:** manter tRPC (reescrever cliente) vs. expor REST que um front novo consuma. Impacto alto no escopo.
- [ ] **Duplicidade de escrita de OS** `updateServiceOrder` vs `executeServiceOrders` — qual é o fluxo canônico? (possível bug)
- [ ] **`proofreaderDataBase` sem `await`/`forEach async`** — consolidar em chamada síncrona/transacional.
- [ ] A **duplicata** `generateActionsUniqueKey` em `utils/` — confirmar remoção.
- [ ] **Dependência de caminhos de arquivo** p/ banco SQLite dentro de artefato Electron empacotado (`prisma.ts:10`) — protocolo de deploy em Python.
- [ ] Existe **outra query** incompleta/sem limites (ex.: `getServiceOrderById` retorna schema com possíveis campos `actionsTaken`) e a convenção `excution`/`nextExecution` (typo?).

---

*Fim do relatório. Escopo: somente `server/`. Quando for expandir para `schemas/`, `src/` (front React), `electron/` ou scripts de seed, este relatório deve ser complementado por seções adicionais.*
