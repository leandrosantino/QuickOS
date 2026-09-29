# DEVELOPER AGENT

Você é um agente de desenvolvimento criado para auxiliar um desenvlvedor a migrar uma aplicação desktop inicialmente criada
em react e electron para um bakend em python com pywebview. O projeto desenvolvido trata-se de um gestor de oredens de serviço 
preventivas, que será aplicado a máquinas do setor industrial automotivo.

## Ambiente de Desenvolvimento

**Front-end (React)**
- Resources: @/src
- Gestor de paotes: bun
- LIB de componentes: shadcn/ui + BaseUI + TailwindCSS
- Compilador: Vite

**Back-end (python)**
- Resources: @/src-py
- Gestor de paotes: uv
- Banco de dados: sqlite
- ORM: Prisma

## Convenções do código

**Front-end (React)**
- A logica dos componenetes deve ficar o mais separada possivel da declaração da interface. Sempre que possivel desacople decições logicas
em arquivos utilizando o formato do hooks. 
- Sempre nomei os arquivos e pastas com o formato kebab-case. Execto os arquivos que são um compoenente do react.
Esse devem seguir o formato camelCase.
- Sempre utilize os componentes do shadcn/ui para construir as interfaces. Utilize a skill /shadcn para executar os comandos necessários.

**Back-end (python)**


## Documentação
Na pasta [docs](./docs/) você pode encontrar a documentação da api no arquivp [api-doc.md](./docs/api-doc.md) 
sempre que uma modificação for feita na API atualise esse arquivos. Caso precise de informações sobre a API consulte ele.

Nela também consta o arquivos [TODO.md](./docs/TODO.md) ele é o "backlog" do projeto, 
lá estão as atividades pendentes para finalizalção do projeto

## Repositório
Quando solicitado realise o commit das alterações feitas, para isso cire um resumo de no máximo 2 linhas
para a menssagem de commit sobre o que foi realizado. Siga o seguinte formato e comandos para realizar o commit:

### Comandos
`git add .` 
`git commit -m <menssagem>`
`git push origin python` 

### Estrutura da Menssagem

```text
tipo(escopo): descrição

exemplo:

feat(auth): adiciona autenticação com JWT
```

O **escopo** é opcional:

```text
feat: adiciona autenticação
feat(auth): adiciona autenticação
```

| Tipo       | Quando usar                           | Exemplo                                    |
| ---------- | ------------------------------------- | ------------------------------------------ |
| `feat`     | Nova funcionalidade                   | `feat: adiciona cadastro de usuários`      |
| `fix`      | Correção de bug                       | `fix: corrige erro no login`               |
| `docs`     | Documentação                          | `docs: atualiza README`                    |
| `style`    | Formatação, sem alteração de lógica   | `style: ajusta indentação`                 |
| `refactor` | Refatoração sem alterar comportamento | `refactor: simplifica serviço de usuários` |
| `perf`     | Melhoria de desempenho                | `perf: otimiza consulta de produtos`       |
| `test`     | Criação ou alteração de testes        | `test: adiciona testes para autenticação`  |
| `build`    | Alterações no build/dependências      | `build: atualiza versão do React`          |
| `ci`       | CI/CD                                 | `ci: adiciona pipeline do GitHub Actions`  |
| `chore`    | Tarefas gerais de manutenção          | `chore: atualiza configurações do projeto` |
| `revert`   | Reverte um commit anterior            | `revert: reverte alteração no login`       |

Sempre valide a menssagem de commit com o usuário antes de executar o comando.

## Roules

- Sempre releia os arquivos que vc edita para não sobrepor as modificações feitas pelo usuário. 
- Nunca realize verificações da solução, o usuário se responsabiliza por validar a implementação.