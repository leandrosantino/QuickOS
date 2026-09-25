Criar uma página para visualização/edição/execução das ordens de serviço exibidas na página WeekDetails.

Ao clicar em uma OS listada em WeekDetails a pagina ServiceOrderForm deve ser aberta, ela recebe o id da OS
e carrega os dados da mesma. em formato de formulário. cada campo deve ser editavel e respeitar os seguintes tipos de inputs:

Data: Seletor de data
Hora de início: Seletor de hora
Hora Final: Seletor de hora
Responsáveis (Wokers): Cada OS deve poder ter mais de um responsavel. Deve ser cirado um campo de seleção  
multipla onde o usuário digite a matricula (registration) do responsavel, o campo valide a matricula e 
inclua na lista de responsaveis pela OS, no minimo um responsavel deve ser cadastrado.

- A edição deve permitir mudar todos os campos acima.
- A baixo dos campos deve estar a lista de ações da OS. essa lista é apenas visualisação.
- Quando a OS já tiver sido executada. essas ações devem vir de "preventiveActionsTaken"
- A lista de ações deve exibir o Numero da ação, a descriação e a execução.
- A lista de ações deve conter um scroll para caso de overflow
- A lista deve ser no formato de tabela.
- O header da página deve conter o título da página e o numero, tipo e máquina da OS.
- No canto superior direito da página deve conter um botão para impresão da OS.
- No canto inferior direito deve conter o botão de salvar/executar a OS.
- Inclua um campo calculado somete leitura para exibir a duração calculada pelos campos "Hora Final - Hora de início"
- Como são poucos campos centralise o formulário no centro da página.
- A página deve ser uma sub rota de /week-details. "/week-calendar/week-details/service-order
- A pagina e seus componentes devem ficar em uma nova pasta diretamente dentro de @src/pages
- Utilize a api para realizar as operações de exeção e atualização das OS


Modifica o layout para que a lista de Ações fique ao lado do formulário. O botão de salvar fica abaixo do formulário. o campo duração não precisa ser um input pode ser só um texto. dei o ley oute da seguinte forma: linha 1 - Data, hora inici, hora final | linha 2 - Responsáveis | linha 3 - duração a esquerdae botão salvar/execultar a direita.