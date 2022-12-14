const express = require('express');
const routes = express.Router();
const ControllerUsuario = require('./controllers/UsuarioController');

routes
  .get('/usuario/:id',ControllerUsuario.index);

module.exports = routes
