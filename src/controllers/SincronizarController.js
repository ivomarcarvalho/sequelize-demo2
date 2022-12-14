const FbUsuario = require('./FbUsuarioController');

module.exports = {
    async sincroniza(i) {
        await FbUsuario.index();
    }
}