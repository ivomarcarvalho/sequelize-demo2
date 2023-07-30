const Receber = require('../models/Receber');
const { executeQuery } = require('../database/configFirebird');
const moment = require('moment/moment');
const { col } = require('sequelize');

module.exports = {
    async atualiza(carga) {
        receberFirebird(carga)
            .then((titulos) => {
                console.log('leitura firebird, deu bom!')
                if (carga === 't') {
                    create(titulos)
                        .then((r) => {
                            console.log(r)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }
            })
            .catch(() => {
                console.log('Houve um erro na leitura firebird!')
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


function receberFirebird(carga) {
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
        let ssql = 'select  first 1 r.numero_titulo,\
                            r.situacao,\
                            r.data_emissao dt_emissao,\
                            r.data_vencimento dt_vencimento,\
                            r.data_quitacao dt_quitacao,\
                            r.codigo_cliente cliente_id,\
                            r.codigo_vendedor vendedor_id,\
                            r.sequencia_operacao,\
                            r.valor_titulo vlr_titulo,\
                            r.tot_valor_recebido vlr_recebido,\
                            r.tot_valor_areceber vlr_areceber,\
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
async function create(req) {
    console.log(req)
    return new Promise((resolve, reject) => {
        Receber.bulkCreate(req)
        var r = 'r=blz'
        if (1===12){
            resolve(r)

        }else{
            var err = 'com erro'
            reject(err)
        }
    })
}

async function createOrUpdate(req) {
    //console.log(req.map(x=>x))
    // console.log(req)
    //  await Receber.bulkCreate(req);

    /*
       await Receber.bulkCreate([{
           'numero_titulo':req.map(x=>x.NUMERO_TITULO)}]);
    */

    var titulos = req.slice(3, 4); // pule 3 e pare no quarto
    for (let x of titulos) {
        console.log(x.NUMERO_TITULO + ' ' + x.VALOR_TITULO)
    }


    /*
     await Object.keys(req).forEach(item => {
         findCreateUpdate(req[item])})
    */
}

async function findCreateUpdate(req) {
    try {
        const receber = await Receber.findByPk(req.NUMERO_TITULO)
        if (receber === null) {
            console.log('No Firebird = ' + req.NUMERO_TITULO + ' ' + ' *********** ');
            var hora = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
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
                "inclusao_data": req.INCLUSAO_DATA === null ? new Date() : req.INCLUSAO_DATA,
                "inclusao_hora": req.INCLUSAO_HORA === null ? hora : req.INCLUSAO_HORA,
                "alteracao_usuario": req.ALTERACAO_USUARIO,
                "alteracao_data": req.ALTERACAO_DATA === null ? new Date() : req.ALTERACAO_DATA,
                "alteracao_hora": req.ALTERACAO_HORA === null ? hora : req.ALTERACAO_HORA
            })
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
    } catch (error) {
        console.log('Error: ' + error)
    }
}

