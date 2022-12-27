const Vendedor = require('./VendedorController');
module.exports = {
    async sincroniza(i) {
        /*
         Sincronizar as tabelas entre o firebird e o mysql
         passando como parametro "carga" se "I" ou "M"
         I - Carga inicial (totdos os registros)
         M - Carga de manutenção (registros inexistentes ou modificados) 
        */
        const carga = 'I';
        await Vendedor.index(carga);
    }
}