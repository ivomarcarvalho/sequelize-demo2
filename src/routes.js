const express = require('express');
const routes = express.Router();
const ReceberController = require('./controllers/ReceberController');

routes
  .get('/receber/:carga',ReceberController.index)
  .delete('/receber/:titulo',ReceberController.delete);
 
module.exports = routes
