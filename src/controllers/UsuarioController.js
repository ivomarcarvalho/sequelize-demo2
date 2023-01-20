const { executeQuery } = require('../database/configFirebird');
const Usuario = require('../models/Usuario');

module.exports = {
  async index(carga) {
    let filtro = [];
    let sWhere = '';
    if (carga === 't') {
      sWhere = 'where  u.cr_usuario = ? and u.codigo_usuario > ? ';
      filtro = ['001', 0];
    } else {
      const dt = new Date();
      let dateString = dt.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.')
      sWhere = 'where  (u.inclusao_data + 5 >= ?) \
                  or     (u.alteracao_data + 5 >= ?) ';
      filtro = [dateString, dateString];
    }
    let ssql = 'select u.codigo_usuario,\
                       u.nome, \
                       u.situacao, \
                       u.master, \
                       u.login, \
                       u.senha, \
                       cast(u.observacao as varchar(500)) as observacao, \
                       u.inclusao_usuario, \
                       u.inclusao_data, \
                       u.inclusao_hora, \
                       u.alteracao_usuario, \
                       u.alteracao_data, \
                       u.alteracao_hora \
                  from t_usuario u '+
      sWhere +
      'order by u.cr_usuario, u.codigo_usuario ';
    executeQuery(ssql, filtro,
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            atualiza(result);
          }
        }
      });
  }
}
async function atualiza(req) {
  await Object.keys(req).forEach(item => {
    createOrUpdate(req[item]);
  })
}
async function createOrUpdate(req) {
  const usuario = await Usuario.findOne({
    where: {
      id: req.CODIGO_USUARIO
    }
  })
  if (usuario === null) {
    var hora = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    await Usuario.create({
      "id": req.CODIGO_USUARIO,
      "nome": req.NOME,
      "situacao": req.SITUACAO,
      "master": req.MASTER,
      "login": req.LOGIN,
      "senha": req.SENHA,
      "observacao": req.OBSERVACAO,
      "inclusao_usuario": req.INCLUSAO_USUARIO,
      "inclusao_data": req.INCLUSAO_DATA === null ? new Date() : req.INCLUSAO_DATA,
      "inclusao_hora": req.INCLUSAO_HORA === null ? hora : req.INCLUSAO_HORA,
      "alteracao_usuario": req.ALTERACAO_USUARIO,
      "alteracao_data": req.ALTERACAO_DATA === null ? new Date() : req.ALTERACAO_DATA,
      "alteracao_hora": req.ALTERACAO_HORA === null ? hora : req.ALTERACAO_HORA
    })
  } else {
    await Usuario.update({
      "id": req.CODIGO_USUARIO,
      "nome": req.NOME,
      "situacao": req.SITUACAO,
      "master": req.MASTER,
      "login": req.LOGIN,
      "senha": req.SENHA,
      "observacao": req.OBSERVACAO,
      "inclusao_usuario": req.INCLUSAO_USUARIO,
      "inclusao_data": req.INCLUSAO_DATA,
      "inclusao_hora": req.INCLUSAO_HORA,
      "alteracao_usuario": req.ALTERACAO_USUARIO,
      "alteracao_data": req.ALTERACAO_DATA,
      "alteracao_hora": req.ALTERACAO_HORA
    }, {
      where: {
        id: req.CODIGO_USUARIO
      }
    })

  }
}