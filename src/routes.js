const express = require('express');

const AdminController = require('./controllers/AdminController');
const CategoriaController = require('./controllers/CategoriaController');
const ProdutoController = require('./controllers/ProdutoController');

const authMiddlewares = require('./middlewares/auth');

const routes = express.Router();

// register and authenticate
routes.post('/admin', AdminController.store); // cria admin
routes.get('/admin', AdminController.authe); // logar admin


//middlewares authenticate
routes.use(authMiddlewares);

// mostras users admins
routes.get('/users_admin', AdminController.show);

//categorias
routes.post('/categoria', CategoriaController.store);
routes.get('/categorias', CategoriaController.index);
routes.put('/categoria/:categoria_id', CategoriaController.updateCategoria);
routes.delete('/categoria/:categoria_id', CategoriaController.deleteCategoria);


//produtos
routes.post('/produto', ProdutoController.store);
routes.get('/produtos', ProdutoController.index);
routes.put('/produto/:produto_id', ProdutoController.updateProduto);
routes.post('/produto/:produto_id/categoria/:categoria_id', ProdutoController.addCategoria);
routes.delete('/produto/:produto_id', ProdutoController.deleteProduto);


module.exports = routes 