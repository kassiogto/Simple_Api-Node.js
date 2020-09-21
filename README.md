<h1> API REST em nodeJs </h1>

<p align="justify"> API REST em nodeJS, usando express. Essa API cria um usuario, e faz uma autenticação via token, utilizando a biblioteca JWT.</p>
<p align="justify"> O banco de dados utilizado pela API é o MySQL e tambem ultiliza o ORM Sequelize. Para fazer a comunicação com NodeJs. </p>


### :trophy: Funcionalidades

- Cadastro e atualizações de administrador ao banco de dados.
  - Com nome, email, senha e data de criação(automatico).
  - Update nome, email e senha.
  - Mostra todos os usuarios cadastrados e sua data.
  - Exclusão de usuario.
  
 - Login de contas administradores.
    - Com email e senha.
    - Ao Logar na Conta Recebe um token de 24 horas para acesso as funções de administradores.
    - todas as rotas só serão acessadas com token de login(menos a criação de usuario e login).
    
 - Categorias 
    - As categorias serão criadas com Nome e ID da conta administrador.
    - Todas categorias serão criadas com um Array de produtos.
    - Categorias estão Relacionados com os Produtos.
    - A busca de Categorias esta relacionadas ao Id incluido todos os produtos contidos em si.
    - A remoção de categorias será buscadas por Id no Headers.
  
  - Produtos
    - Produtos são criados com Id, nome, ref e valor.
    - A listagem de produtos vem associadas a categorias.
    - A adição de produtos a categorias, são por id de produto e id de categoria nos headers.
    - Update no nome, ref, valor pelo id do produto.
    - Delete por id de produto.
    
 ## :exclamation: Instalação e configuração
<------ NPM ( https://www.npmjs.com/get-npm ) ------->
<br>
<------ Express ( https://expressjs.com/en/starter/installing.html ) ------>
<br>
<------ JWT ( https://www.npmjs.com/package/jsonwebtoken ) ------>
<br>
<------ Sequelize ( https://sequelize.org/master/manual/getting-started.html#installing ) ----->

 
No terminal Git digite o comando:
---
    git clon https://github.com/kassiogto/Simple_Api-Node.js.git
---
Crie uma pasta chamada 'config', dentro dela crie um Arquivo chamado 'database.js', nesse arquivo coloque:
 <p align="justify"> 
 <br> module.exports = {
     dialect: 'mysql',
     host: 'localhost',
     username: 'root',
     password: 'Sua senha',
     database: 'teste-git',
     define: {
     timestamps: true,
     underscored: true,
    }
  }
  </p>
<br>
Na mesma pasta config Crie outro arquivo chamado 'auth.json' dentro desse arquivo coloque:<br>
{
    "secret": "Aqui vai a palavra chave do JWT de acordo com o que sua Api  diz"
}
<br>

:exclamation:instale as dependencias
 ---
 NPM install
 ---
 
 no terminal digite: <strong>Npx Sequelize db:create</strong><br>
 Após o primeiro comando digite: <strong>Npx sequelize db:migrate</strong><br>
 após a criação de todas as migrations, use o comando: <strong>NPM start</strong>

#########################
