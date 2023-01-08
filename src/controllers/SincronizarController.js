const Cliente = require('./ClienteController');
const Usuario = require('./UsuarioController');
const Vendedor = require('./VendedorController');
const Condicao_pagto = require('./Condicao_pagtoController');
const Produto = require('./ProdutoController');
const Receber = require('./ReceberController');
var n = 0;
module.exports = {
    async sincroniza(carga) {
        /*
         Sincronizar as tabelas entre o firebird e o mysql
         passando como parametro "carga" se "t" ou "m"
         t - Carga total (totdos os registros)
         m - Carga de manutenção (registros inexistentes ou modificados) 
        */
         n++;
         if (n == 1 ){
            carga = 't'
         }else{
            carga = 'm'
         }
        // await Cliente.index(carga);
        // await Usuario.index(carga);
        // await Vendedor.index(carga);
        // await Condicao_pagto.index(carga);
        // await Produto.index(carga); 
         await Receber.index(carga,n);
    }
}