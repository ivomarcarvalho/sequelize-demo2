const Cliente = require('./ClienteController');
const Usuario = require('./UsuarioController');
const Vendedor = require('./VendedorController');
const Condicao_pagto = require('./Condicao_pagtoController');
const Produto = require('./ProdutoController');
const Receber_0 = require('./ReceberController_0');
const Receber_1 = require('./ReceberController_1');
const Receber = require('./ReceberController');
const Unidade = require('./UnidadeController');

var n = 0;
//let carga = '';
module.exports = {
   async sincroniza() {
      /*
       Sincronizar as tabelas entre o firebird e o mysql
       passando como parametro "carga" se "t" ou "m"
       t - Carga total (totdos os registros)
       m - Carga de manutenção (registros inexistentes ou modificados) 
      */
      n++;
      if (n == 1) {
         carga = 't'
      } else {
         carga = 'm'
      }
      //await Unidade.atualiza(carga);
      //await Cliente.index(carga);
      //await Usuario.index(carga);
      //await Vendedor.atualiza(carga);
      //await Condicao_pagto.index(carga);
      //await Produto.index(carga); 
      //await Receber_0.index(carga);
      //await Receber_1.atualiza(carga);
      await Receber.atualiza(carga);
   }
}