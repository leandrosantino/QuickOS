# API Python — Documentação das Rotas

Servidor Flask com `CORS` habilitado, rodando em `host=0.0.0.0` e `porta=3333`.

Todas as rotas estão organizadas em dois *blueprints*:

- `/main` — cadastros básicos (máquinas, naturezas e trabalhadores).
- `/preventive` — manutenção preventiva (ações e ordens de serviço).

## Convenções

- **Base URL:** `http://localhost:3333`
- **Formato:** `application/json`
- **Sucesso genérico** (operações de criação/atualização/remoção):

```json
{ "message": "Successfully performed operation!", "code": 200 }
```

- **Não encontrado** (rotas por ID):

```json
null
```

com status HTTP `404`.

---

## Blueprint `/main`

### `GET /main/machines`

Lista todas as máquinas.

**Resposta:** `200 OK` — array de objetos `Machine`:

```json
[
  { "id": 1, "tag": "TAG-01", "ute": "UTE-01", "technology": "Torno" }
]
```

| Campo       | Tipo   | Descrição                     |
| ----------- | ------ | ----------------------------- |
| `id`        | int    | Identificador da máquina      |
| `tag`       | string | Tag da máquina                |
| `ute`       | string | UTE da máquina                |
| `technology`| string | Tecnologia da máquina         |

---

### `GET /main/natures`

Lista todas as naturezas.

**Resposta:** `200 OK` — array de objetos `Nature`:

```json
[
  { "id": 1, "name": "Elétrica" }
]
```

| Campo  | Tipo   | Descrição                |
| ------ | ------ | ------------------------ |
| `id`   | int    | Identificador da natureza |
| `name` | string | Nome da natureza          |

---

### `GET /main/workers`

Lista todos os trabalhadores.

**Resposta:** `200 OK` — array de objetos `Worker`:

```json
[
  { "id": 1, "registration": 1234, "name": "João", "workerClass": "Mecânico" }
]
```

| Campo         | Tipo   | Descrição                |
| ------------- | ------ | ------------------------ |
| `id`          | int    | Identificador            |
| `registration`| int    | Matrícula                |
| `name`        | string | Nome                     |
| `workerClass` | string | Classe/cargo do trabalhador |

---

### `GET /main/workers/registration/<int:registration>`

Busca um trabalhador pela matrícula.

**Parâmetro de rota:** `registration` (int) — matrícula do trabalhador.

**Resposta:**
- `200 OK` — objeto `Worker`.
- `404 Not Found` — `null` quando não encontrado.

---

### `GET /main/workers/<int:id>`

Busca um trabalhador pelo ID.

**Parâmetro de rota:** `id` (int) — identificador do trabalhador.

**Resposta:**
- `200 OK` — objeto `Worker`.
- `404 Not Found` — `null` quando não encontrado.

---

## Blueprint `/preventive`

### `POST /preventive/service-orders`

Gera (monta) as ordens de serviço para uma semana/ano, agrupando as ações
preventivas pendentes por máquina e natureza. Cria novas ordens via *upsert* e
retorna as ordens geradas (e/ou concluídas conforme o status).

**Corpo da requisição:**

```json
{
  "week": 37,
  "year": 2026,
  "status": "false",
  "nature": -1,
  "machine": -1
}
```

| Campo     | Tipo   | Obrigatório | Descrição                                                       |
| --------- | ------ | ----------- | --------------------------------------------------------------- |
| `week`    | int    | Sim         | Semana do ano                                                    |
| `year`    | int    | Sim         | Ano                                                              |
| `status`  | string | Sim         | `"true"` (concluídas), `"false"` (não concluídas) ou `"all"`     |
| `nature`  | int    | Sim         | ID da natureza ou `-1` para todas                                |
| `machine` | int    | Sim         | ID da máquina ou `-1` para todas                                 |

**Resposta:** `200 OK` — array de objetos `ServiceOrder`.

---

### `GET /preventive/service-orders/<int:id>`

Busca uma ordem de serviço pelo ID.

**Parâmetro de rota:** `id` (int) — identificador da ordem de serviço.

**Resposta:**
- `200 OK` — objeto `ServiceOrder`.
- `404 Not Found` — `null` quando não encontrado.

---

### `PUT /preventive/service-orders/<int:id>`

Atualiza uma ordem de serviço (marca como concluída, define data, horários e
responsáveis).

**Parâmetro de rota:** `id` (int) — identificador da ordem de serviço.

**Corpo da requisição:**

```json
{
  "data": {
    "date": "2026-09-13",
    "workers": [{ "id": 1 }],
    "startTime": "2026-09-13T08:00:00",
    "finishTime": "2026-09-13T10:00:00"
  }
}
```

| Campo                | Tipo         | Descrição                          |
| -------------------- | ------------ | ---------------------------------- |
| `data`               | object       | Dados da ordem de serviço          |
| `data.date`          | string       | Data de execução                   |
| `data.workers`       | array        | Lista de `{ "id": int }`           |
| `data.startTime`     | string       | Horário de início                  |
| `data.finishTime`    | string       | Horário de término                 |

**Resposta:** `200 OK` — objeto de sucesso genérico.

---

### `DELETE /preventive/service-orders/<int:id>`

Remove uma ordem de serviço.

**Parâmetro de rota:** `id` (int) — identificador da ordem de serviço.

**Resposta:** `200 OK` — objeto de sucesso genérico.

---

### `POST /preventive/service-orders/execute`

Executa uma ordem de serviço: marca como concluída, registra a data, os
horários, os responsáveis, calcula a duração, agenda a próxima execução das
ações relacionadas e cria os registros de ações executadas (`actionsTaken`).

**Corpo da requisição:**

```json
{
  "id": 1,
  "date": "2026-09-13",
  "workers": [{ "id": 1 }],
  "startTime": "2026-09-13T08:00:00",
  "finishTime": "2026-09-13T10:00:00"
}
```

| Campo        | Tipo         | Obrigatório | Descrição                  |
| ------------ | ------------ | ----------- | -------------------------- |
| `id`         | int          | Sim         | ID da ordem de serviço     |
| `date`       | string       | Sim         | Data de execução           |
| `workers`    | array        | Não         | Lista de `{ "id": int }`   |
| `startTime`  | string       | Sim         | Horário de início          |
| `finishTime` | string       | Sim         | Horário de término         |

**Resposta:** `200 OK` — objeto de sucesso genérico.

---

### `GET /preventive/actions`

Lista as ações preventivas com filtros e paginação via cursor.

**Parâmetros de query:**

| Parâmetro    | Tipo   | Padrão    | Descrição                                            |
| ------------ | ------ | --------- | ---------------------------------------------------- |
| `searchText` | string | `""`      | Filtro por texto (contido na descrição)              |
| `weekCode`   | string | `""`      | Filtro por código da semana (ex.: `2026-W37`)        |
| `machineId`  | int    | `-1`      | Filtro por máquina (`-1` = todas)                    |
| `natureId`   | int    | `-1`      | Filtro por natureza (`-1` = todas)                   |
| `showIgnore` | string | `"false"` | `"true"` para incluir ações ignoradas                |
| `limit`      | int    | —         | Quantidade de registros por página                   |
| `cursor`     | int    | —         | ID usado como cursor de paginação                    |

**Resposta:** `200 OK` — array de objetos `Action`.

---

### `POST /preventive/actions`

Cria uma nova ação preventiva.

**Corpo da requisição:**

```json
{
  "description": "Lubrificar eixos",
  "machineId": 1,
  "excution": "diária",
  "frequency": 1,
  "natureId": 1,
  "nextExecution": "2026-W38",
  "preventiveOSId": null,
  "ignore": false
}
```

| Campo            | Tipo           | Obrigatório | Descrição                           |
| ---------------- | -------------- | ----------- | ----------------------------------- |
| `description`    | string         | Sim         | Descrição da ação                   |
| `machineId`      | int            | Sim         | ID da máquina                       |
| `excution`       | string         | Sim         | Tipo de execução                    |
| `frequency`      | int            | Sim         | Frequência (em semanas)             |
| `natureId`       | int            | Sim         | ID da natureza                      |
| `nextExecution`  | string         | Sim         | Próxima execução (código da semana) |
| `preventiveOSId` | int \| null    | Não         | ID da ordem de serviço relacionada  |
| `ignore`         | bool           | Sim         | Se a ação está ignorada             |

**Resposta:** `200 OK` — objeto de sucesso genérico.

---

### `PUT /preventive/actions/<int:id>`

Atualiza uma ação preventiva.

**Parâmetro de rota:** `id` (int) — identificador da ação.

**Corpo da requisição:** objeto `data` com os mesmos campos do `POST /preventive/actions`:

```json
{
  "data": {
    "description": "Lubrificar eixos",
    "machineId": 1,
    "excution": "diária",
    "frequency": 1,
    "natureId": 1,
    "nextExecution": "2026-W38",
    "preventiveOSId": null,
    "ignore": false
  }
}
```

**Resposta:** `200 OK` — objeto de sucesso genérico.

---

### `DELETE /preventive/actions/<int:id>`

Remove uma ação preventiva.

**Parâmetro de rota:** `id` (int) — identificador da ação.

**Resposta:** `200 OK` — objeto de sucesso genérico.

---

### `GET /preventive/service-orders/count`

Retorna a contagem de ordens de serviço concluídas e não concluídas para uma
determinada semana/ano.

**Parâmetros de query:**

| Parâmetro | Tipo | Descrição       |
| --------- | ---- | --------------- |
| `week`    | int  | Semana do ano   |
| `year`    | int  | Ano             |

**Resposta:** `200 OK` — objeto `ServiceOrderCount`:

```json
{ "finished": 10, "unfinished": 3 }
```

| Campo        | Tipo | Descrição                        |
| ------------ | ---- | -------------------------------- |
| `finished`   | int  | Total de ordens concluídas       |
| `unfinished` | int  | Total de ordens não concluídas   |

---

## Modelos de Dados

### `Machine`

| Campo        | Tipo   |
| ------------ | ------ |
| `id`         | int    |
| `tag`        | string |
| `ute`        | string |
| `technology` | string |

### `Nature`

| Campo  | Tipo   |
| ------ | ------ |
| `id`   | int    |
| `name` | string |

### `Worker`

| Campo         | Tipo   |
| ------------- | ------ |
| `id`          | int    |
| `registration`| int    |
| `name`        | string |
| `workerClass` | string |

### `Action`

| Campo            | Tipo                 |
| ---------------- | -------------------- |
| `id`             | int                  |
| `description`    | string               |
| `machineId`      | int                  |
| `excution`       | string               |
| `frequency`      | int                  |
| `nextExecution`  | string               |
| `preventiveOSId` | int \| null          |
| `natureId`       | int                  |
| `ignore`         | bool                 |
| `machine`        | `Machine` \| null    |
| `nature`         | `Nature` \| null     |

### `ActionTaken`

| Campo      | Tipo      |
| ---------- | --------- |
| `id`       | int       |
| `date`     | datetime  |
| `osId`     | int       |
| `actionId` | int       |
| `weekCode` | string    |
| `action`   | `Action`  |

### `ServiceOrder`

| Campo              | Tipo                   |
| ------------------ | ---------------------- |
| `id`               | int                    |
| `weekCode`         | string                 |
| `date`             | datetime \| null       |
| `natureId`         | int                    |
| `duration`         | int \| null            |
| `concluded`        | bool \| null           |
| `startTime`        | datetime \| null       |
| `finishTime`       | datetime \| null       |
| `machineId`        | int                    |
| `actionsUniqueKey` | string                 |
| `nature`           | `Nature` \| null       |
| `machine`          | `Machine` \| null      |
| `responsible`      | `Worker[]`             |
| `actions`          | `Action[]`             |
| `actionsTaken`     | `ActionTaken[]`        |
