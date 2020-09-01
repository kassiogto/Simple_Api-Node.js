  
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Admin = require('../model/Admin');
const Categoria = require('../model/Categoria');
const Produto = require('../model/Produto');

const connection = new Sequelize(dbConfig);

Admin.init(connection);
Categoria.init(connection);
Produto.init(connection);

Categoria.associate(connection.models);
Produto.associate(connection.models);

module.exports = connection;