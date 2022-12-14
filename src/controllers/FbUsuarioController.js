const { executeQuery } = require('../database/configFirebird');
const Usuario = require('./UsuarioController');

module.exports = {
  async index(req, res) {
    let usuario = [];
    const { id } = { id: 100 };
    var dt = new Date();
    let filtro = ['001',id];
    let ssql = 'select u.cr_usuario,\
                       u.codigo_usuario,\
                       u.nome, \
                       u.situacao, \
                       u.master, \
                       u.login, \
                       u.senha, \
                       u.observacao, \
                       u.inclusao_usuario, \
                       u.inclusao_data, \
                       u.inclusao_hora, \
                       u.alteracao_usuario, \
                       u.alteracao_data, \
                       u.alteracao_hora \
                  from t_usuario u\
                  where u.cr_usuario = ?\
                  and   u.codigo_usuario <= ? \
                  order by u.cr_usuario,\
                           u.codigo_usuario ';
    executeQuery(ssql, filtro,
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          //console.log(result.length)
          if (result.length > 0) {
             //Usuario.create(result);
             Usuario.findOrCreate(result);
          }
        }
      });
  }
}