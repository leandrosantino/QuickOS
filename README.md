# QuickOS

O _**"QuickOS"**_ e um sistema de gestão de ordens de serviço preventivas, que
engloba tanto a parte de planejamento das manutenções preventivas quanto a
impressão das ordens e o registro de execução das mesmas. Ele foi construído
como um programa nativo para o Windows, utilizando o _**"ElectronJS"**_ como
Frameworx.

O objetivo do desenvolvimento deste programa é facilitar a gestão das ordens de
serviço, através de uma interface amigável, permitindo ao usuário controlar as
atividades com mais eficiência.

Graças a feature de impressão da ordens, o sistema possibilita uma gestão
cruzada em entre os registros físicos e digitais. O que pode ser essencial para
empresas onde o procedimento exige documentação física.

![image1](https://raw.githubusercontent.com/leandrosantino/QuickOS/main/docs/image1.png)
![image2](https://raw.githubusercontent.com/leandrosantino/QuickOS/main/docs/image2.png)

## Funcionalidades

- CRUD das ações preventivas
- Visualização das OSs separadas por semana
- Visualização do progresso de execução das OSs de cada semana
- Impressão das OSs
- Registro da execução das OSs
- Editar as OSs já registradas

## Aprendizados

Além de ser o primeiro o meu projeto completo com React, o QuickOS também foi a
primeira vez que usei React com ElectronJS e a primeira vez que usei o
Typescript em um projeto. Tudo isso me colocou diante de desafios como:

- Entender o processo de compilação do React e como importar os arquivos já
  compilados do para dentro do ElectronJS.
- Entender o funcionamento do webpack para compilar a parte do ElectronJS.
- Configurar o ElectronJS para funcionar no ambiente de produção de forma
  diferente do ambiente de desenvolvimento.

Além dos citados acima, o desafio que considero o maior desse projeto foi a
parte de navegação das páginas, pois como eu não tinha muita experiência e não
conhecia o“react-router-dom” acabei tendo que construir toda a lógica de
navegação do zero. Contudo a construção dessa lógica me ajudou a ganhar
experiência com a api de contextos do React, o que tem me ajudado muito nos meus
novos projetos.

O desenvolvimento do QuickOS ainda me permitiu aprender algumas bibliotecas,
como:

- Tailwind css
- Zod
- TRPC
- Fastfy
- ReCharts
- React Ions

Por fim, todo o processo de construção deste programa me trouxe muito
aprendizado e evolução como programador, e o conhecimento adquirido com ele vou
carregar por toda a minha carreira.

## Veja o QuickOS funcionando

[![](https://raw.githubusercontent.com/leandrosantino/QuickOS/main/docs/tamb.png)](https://youtu.be/04RF9WVgicU)

#### Link para o Repostório

[github.com/leandrosantino/QuickOS](https://github.com/leandrosantino/QuickOS)

#### Post no Linkedin

[Linkedin - LeandroSantino_QuickOS](https://www.linkedin.com/posts/leandro-santino-7b2717215_fala-galera-hoje-eu-vim-compartilhar-com-activity-7081794046922268672-NqdY?utm_source=share&utm_medium=member_desktop)

## Licença

MIT
