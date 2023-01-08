const Condicao_pagto = require('../models/CondicaoPagto');
const { executeQuery } = require('../database/configFirebird');
const { Op, TIME } = require('sequelize');

module.exports = {
    async index(carga) {
        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where  cp.cr_condicao_pagto = ? and cp.codigo_condicao_pagto >= ? ';
            filtro = ['001', 0];
        } else {
            const dt = new Date();
            let dateString = dt.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '.')
            sWhere = 'where  (cp.inclusao_data + 5 >= ?) \
                      or (cp.alteracao_data + 5 >= ?) ';
            filtro = [dateString, dateString];
        }
        let ssql = 'select cp.codigo_condicao_pagto,\
                             cp.prazo,\
                             cp.inclusao_usuario,\
                             cp.inclusao_data,\
                             cp.inclusao_hora,\
                             cp.alteracao_usuario,\
                             cp.alteracao_data,\
                             cp.alteracao_hora \
                      from t_condicao_pagto cp '+
            sWhere +
            'order by cp.cr_condicao_pagto,\
             cp.codigo_condicao_pagto ';
        executeQuery(ssql, filtro,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(result.length)
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
    const condicao_pagto = await Condicao_pagto.findOne({
        where: {
            id: req.CODIGO_CONDICAO_PAGTO
        }
    });
    if (condicao_pagto === null) {
        // var elvisLives = Math.PI < 4 ? "Yep" : "Nope";
        var hora = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        // console.log(hora);
        await Condicao_pagto.create({
            "id": req.CODIGO_CONDICAO_PAGTO,
            "prazo": req.PRAZO,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA === null ? new Date() : req.INCLUSAO_DATA,
            "inclusao_hora": req.INCLUSAO_HORA === null ? hora : req.INCLUSAO_HORA,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA === null ? new Date() : req.ALTERACAO_DATA,
            "alteracao_hora": req.ALTERACAO_HORA === null ? hora : req.ALTERACAO_HORA
        })
    } else {
        await Condicao_pagto.update({
            "id": req.CODIGO_CONDICAO_PAGTO,
            "prazo": req.PRAZO,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": req.INCLUSAO_HORA,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": req.ALTERACAO_HORA
        }, {
            where: {
                id: req.CODIGO_CONDICAO_PAGTO,
                [Op.or]: [{
                    alteracao_data: {
                        [Op.lt]: req.ALTERACAO_DATA
                    }
                },
                {
                    [Op.and]: [
                        {
                            alteracao_data: {
                                [Op.eq]: req.ALTERACAO_DATA
                            },
                        },
                        {
                            alteracao_hora: {
                                [Op.lt]: `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`
                            }
                        }
                    ]
                }]
            }
        })

    }
}