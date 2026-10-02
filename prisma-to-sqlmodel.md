# Migrar ORM Prisma para SQLModel
Este documento delineia as diretizes para a migração do ORM prisma utilizado no servidor python
em [src-py](./src-py/). 

## Banco de Dados
O arquivo atual do sqlite [app.db](./database/app.db), foi criado pelo prisma e precisa ser mantido.
Os schemas sql do banco froam exportados para [database/sql](./database/sql/). 

## Models
Os models definidos em [schema.prisma](./schema.prisma) precisam ser migrados para os models do
SQLModel, matento todos os relacionamentos de schema.prisma e considerando as tabelas pivot geradas automaticamento pelo prisma. 

## Arquitetura
Os models devem ser criados dentro da pasta [models](./src-py/model). Reorganise a pasta o sistema da seguinte forma: 

src-py
---- model
-------- actions   
-------- service_order
------------ service_order.py (SQLModel)
------------ use_case
---------------- get_service_order_by_id.py
------------ schema
------------ controller

As funções que estão em [repositories](./src-py/repositories/) devem ser ficar tambem dentro das pasta 
model, ciradas como um caso de uso.

Não remova nada do código prisma atual. a migração deve acontecer gradualmente eu vou substituir dos 
controllers da api as importações manualmente. de todo modo crie novos controllers do flask seguindo o formato citado acima.

No arquivo [schema/preventive.py](./src-py/schemas/preventive.py) existem algumas definições de tipo 
do PyDantic  Avalie qual são necessárias e quais não são tendo em vista que o SQLModel já definirá 
os tipos dos models. Aqueles consideradas necessárias com DTOs dos casos de uso. mova para o seu 
respectivo caso de uso. Mas mantenha o arquivo original para a migração.

## TODO

[ ] T01 | Criar os models do SQLModel migrando as definições de schema.prisma e os schemas sql exportado dos banco;
[ ] T02 | Reescrever os casos de uso com a sintax do SQLModel
[ ] T03 | Mover e reorganizar os schemas do PyDantic em [schema/preventive.py](./src-py/schemas/preventive.py)
[ ] T04 | Reescrever os controller de api utilizando os novos casos de uso
[ ] T05 | Remover o código prisma obsoleto

___
Obs. Sempre execute apenas uma tarefa por vês, não realize validações. Atualize a sessão de TODO ao finalizar uma tarefa.

