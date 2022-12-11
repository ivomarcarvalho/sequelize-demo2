const express = require('express');
const routes = express.Router();
const ControllerUsuario = require('./controllers/ControllerUsuario');


routes
  .get('/usuario/:id',ControllerUsuario.index);

module.exports = routes
