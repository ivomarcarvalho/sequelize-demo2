const Unidade = require('../models/Unidade');
const { executeQuery } = require('../database/configFirebird');
const moment = require('moment/moment');

module.exports = {
    async atualiza(carga) {
        show(carga)
            .then(createOrUpdate)
            .then(() => {
                console.log('deu bom')
            .catch(()=> {
                console.log('deu ruim')
            })
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
function ivm(req) {
    return new Promise((resolve, reject) => {
        Object.keys(req).forEach(item => {
            findCreateUpdate(req[item])
            console.log('xxxxxx ivm xxxxxxx')
        })
    })
}

async function createOrUpdate(req) {
    await Object.keys(req).forEach(item => {
        findCreateUpdate(req[item])
    })
}

async function findCreateUpdate(req) {
    console.log('No Firebird = ' + req.UNIDADE + ' ' + req.DESCRICAO + ' *********** ');
    const [unidade, created] = await Unidade.findOrCreate({
        where: {
            ucom: req.UNIDADE
        },
        defaults: {
            descricao: req.DESCRICAO,
            inclusao_usuario: req.INCLUSAO_USUARIO,
            inclusao_data: req.INCLUSAO_DATA,
            inclusao_hora: req.INCLUSAO_HORA,
            alteracao_usuario: req.INCLUSAO_USUARIO,
            alteracao_data: req.ALTERACAO_DATA,
            alteracao_hora: req.ALTERACAO_HORA


        }
    })

    if (created) {
        console.log('*********** created *************');
        console.log(unidade.ucom);
    } else {
        let dtFb = null;
        let dtMy = null;
        let hhFb = null;
        let hhMy = null;

        if (req.ALTERACAO_DATA != null) {
            dtFb = moment(req.ALTERACAO_DATA).format('YYYY-MM-DD');
            hhFb = moment(req.ALTERACAO_HORA,'hh:mm:ss').format('hh:mm:ss');
        }
        if (unidade.alteracao_data != null) {
            dtMy = moment(unidade.alteracao_data).format('YYYY-MM-DD');
            hhMy = moment(unidade.alteracao_hora, 'hh:mm:ss').format('hh:mm:ss');
        }
        if ((dtFb != dtMy) || (hhFb != hhMy)) {
            console.log('*********** updated *************');
            console.log('DATA FB ' + dtFb + ' ' + hhFb);
            console.log('DATA My ' + dtMy + ' ' + hhMy);
            await Unidade.update({
                descricao: req.DESCRICAO,
                alteracao_usuario: req.ALTERACAO_USUARIO,
                alteracao_data: req.ALTERACAO_DATA,
                alteracao_hora: req.ALTERACAO_HORA
            }, {
                where: {
                    ucom: req.UNIDADE
                }
            });
        }
    }
}
