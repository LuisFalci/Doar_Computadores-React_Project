Realizei o deploy pelo Heroku

Na própria page "/intituicoes", está a lista de instituições;
Formulário está na home page "/". Possui validação de cep no próprio front (remove caracteres que não são números, limita o campo a 8 números e renderiza mensagem para usuário);
Em relação ao formulário, é realizado a validação dos outros campos no backend. Através da resposta obtida, utilizando a função some(), faço a busca pelo nome dos campos apontado pelo back como requeridos e renderizo uma mensagem em vermelho. A função some() aceita que apenas arrays o chame, por isso quando faço a requisição post e recebo a resposta, controlo com if se a resposta é undefined e seto o state para um array vazio.  

LINK HEROKU: https://heroku-falci.herokuapp.com/