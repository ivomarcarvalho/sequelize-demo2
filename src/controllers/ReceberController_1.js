const Receber = require('../models/Receber');
const { executeQuery } = require('../database/configFirebird');
const moment = require('moment/moment');

module.exports = {
    async atualiza(carga) {
        show(carga)
            .then(createOrUpdate)
            .then(() => {
                console.log('deu bom')
                    .catch(() => {
                        console.log('deu ruim')
                    })
            })
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


function show(carga) {
    return new Promise((resolve, reject) => {
        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where r.cr_receber = ? ';
            filtro = ['001'];
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
        let ssql = 'select  r.numero_titulo,\
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
        findCreateUpdate(req[item])
    })
}

async function findCreateUpdate(req) {
    //console.log('No Firebird = ' + req.NUMERO_TITULO + ' ' + ' *********** ');
    const [receber, created] = await Receber.findOrCreate({
        where: {
            numero_titulo: req.NUMERO_TITULO
        },
        defaults: {
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
            "inclusao_hora": `${req.INCLUSAO_HORA.getHours()}:${req.INCLUSAO_HORA.getMinutes()}:${req.INCLUSAO_HORA.getSeconds()}`,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`
        }
    })

    if (created) {
        console.log('*********** created *************');
        console.log(receber.numero_titulo);
    } else {
        let dtFb = null;
        let dtMy = null;
        let hhFb = null;
        let hhMy = null;

        if (req.ALTERACAO_DATA != null) {
            dtFb = moment(req.ALTERACAO_DATA).format('YYYY-MM-DD');
            hhFb = moment(req.ALTERACAO_HORA, 'hh:mm:ss').format('hh:mm:ss');
        }
        if (receber.alteracao_data != null) {
            dtMy = moment(receber.alteracao_data).format('YYYY-MM-DD');
            hhMy = moment(receber.alteracao_hora, 'hh:mm:ss').format('hh:mm:ss');
        }
        if ((dtFb != dtMy) || (hhFb != hhMy)) {
            console.log('*********** updated *************');
            console.log('DATA FB ' + dtFb + ' ' + hhFb);
            console.log('DATA My ' + dtMy + ' ' + hhMy);
            await Receber.update({
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
                "inclusao_hora": `${req.INCLUSAO_HORA.getHours()}:${req.INCLUSAO_HORA.getMinutes()}:${req.INCLUSAO_HORA.getSeconds()}`,
                "alteracao_usuario": req.ALTERACAO_USUARIO,
                "alteracao_data": req.ALTERACAO_DATA,
                "alteracao_hora": `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`
            }, {
                where: {
                    numero_titulo: req.NUMERO_TITULO
                }
            });
        }
    }
}