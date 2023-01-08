const { executeQuery } = require('../database/configFirebird');
const Receber = require('../models/Receber');
const { Op } = require('sequelize');

module.exports = {
    async index(carga) {
        console.log(carga);

        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where r.cr_receber = ? and r.numero_titulo > ?';
            filtro = ['001', 0];
        } else {
            const dt = new Date();
            let dateString = dt.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '.')
            sWhere = 'where  (r.inclusao_data + 5 >= ?) \
                      or     (r.alteracao_data + 5 >= ?) ';
            filtro = [dateString, dateString];
        }
        let ssql = 'select r.numero_titulo,\
                           r.situacao,\
                           r.data_emissao,\
                           r.data_vencimento,\
                           r.data_quitacao,\
                           r.codigo_cliente,\
                           r.codigo_vendedor,\
                           r.sequencia_operacao,\
                           r.valor_titulo,\
                           r.tot_valor_recebido,\
                           r.tot_valor_areceber,\
                           r.inclusao_usuario,\
                           r.inclusao_data,\
                           r.inclusao_hora,\
                           r.alteracao_usuario,\
                           r.alteracao_data,\
                           r.alteracao_hora \
                    from f_receber r '+
            sWhere +
            'order by r.cr_receber, r.numero_titulo ';
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
    },
    async delete(req, res) {
        const { titulo } = req.params;
        let oper = {};
        if (titulo == 0) {
            oper = { [Op.gte]: titulo }
        } else {
            oper = { [Op.eq]: titulo }
            const receber = await Receber.findOne({ where: { numero_titulo: oper } })
            if (!receber) {
                return res.json({ msg: 'título (' + titulo + ') não localizado!' })
            }
        }

        Receber.destroy({ where: { numero_titulo: oper } })
            .then(() => {
                return res.status(200).json({ msg: 'Exclusão realizada com sucesso!' })
            })
    }
}

async function atualiza(req) {
    await Object.keys(req).forEach(item => {
        createOrUpdate(req[item]);
    })
};

async function createOrUpdate(req) {
    const receber = await Receber.findByPk(req.NUMERO_TITULO)
        .catch((err) => {
            console.log('Error: ' + err)
        })
    if (receber === null) {
        await Receber.create({
            "numero_titulo": req.NUMERO_TITULO,
            "sequencia_operacao": req.SEQUENCIA_OPERACAO,
            "dt_emissao": req.DATA_EMISSAO,
            "dt_vencimento": req.DATA_VENCIMENTO,
            "clienteId": req.CODIGO_CLIENTE,
            "vendedorId": req.CODIGO_VENDEDOR,
            "situacao": req.SITUACAO,
            "vlr_titulo": req.VALOR_TITULO,
            "vlr_recebido": req.TOT_VALOR_RECEBIDO,
            "vlr_areceber": req.TOT_VALOR_ARECEBER,
            "atraso": req.ATRASO,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": req.INCLUSAO_HORA,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": req.ALTERACAO_HORA
        })
    } else {
        await Receber.update({

        }, {
            where: {
                numero_titulo: req.NUMERO_TITULO,
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