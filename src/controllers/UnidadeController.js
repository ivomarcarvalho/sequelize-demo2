const Unidade = require('../models/Unidade');
const { executeQuery } = require('../database/configFirebird');

module.exports = {
    async atualiza(carga) {
          show(carga)
            .then((req) => {
                createOrUpdate(req)
            })
    }
}

function show(carga) {
    return new Promise((resolve, reject) => {
        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where u.cr_unidade = ?';
            filtro = ['001'];
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
        let ssql = 'select u.unidade,\
                       u.descricao,\
                       u.inclusao_usuario,\
                       u.inclusao_data,\
                       u.inclusao_hora,\
                       u.alteracao_usuario,\
                       u.alteracao_data,\
                       u.alteracao_hora \
                from t_unidade u '+
            sWhere +
            'order by u.cr_unidade, u.unidade ';
        executeQuery(ssql, filtro,
            function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        resolve(result);
                    }
                }
            })
    })
}

async function createOrUpdate(req) {
    await Object.keys(req).forEach(item => {
        findFirst(req[item])
    })
}

async function findFirst(req) {
    const unidade = await Unidade.findOne({
        where: {
            unidade: req.UNIDADE
        }
    })
    if (unidade === null) {
        console.log('nao existe')
    } else {
        console.log(' existe')

    }
}


