const Vendedor = require('../models/Vendedor');
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
            sWhere = 'where v.cr_vendedor = ?';
            filtro = ['001'];
        } else {
            const dt = new Date();
            let dateString = dt.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '.')
            sWhere = 'where  (v.inclusao_data + 5 >= ?) \
                      or     (v.alteracao_data + 5 >= ?) ';
            filtro = [dateString, dateString];
        }
        let ssql = 'select v.codigo_vendedor,\
                           v.situacao,\
                           v.categoria,\
                           v.cpf_cnpj,\
                           v.nome,\
                           cast(v.observacao as varchar(500)) observacao,\
                           v.forca_venda,\
                           v.comissionado,\
                           v.comissao_base_pagamento,\
                           v.comissao_base_apuracao,\
                           v.comissao_produto,\
                           v.comissao_cta_debito_inclusao,\
                           v.comissao_cta_credito_inclusao,\
                           v.comissao_cta_debito_liquidacao,\
                           v.comissao_cta_credito_liquidacao,\
                           v.cr_fornecedor,\
                           v.codigo_fornecedor,\
                           v.cr_plano_conta_gerencial,\
                           v.numero_plano_conta_gerencia,\
                           v.cr_centro_custo,\
                           v.codigo_centro_custo,\
                           v.inclusao_usuario,\
                           v.inclusao_data,\
                           v.inclusao_hora,\
                           v.alteracao_usuario,\
                           v.alteracao_data,\
                           v.alteracao_hora \
                    from   c_vendedor v ' +
            sWhere +
            'order by v.cr_vendedor,v.codigo_vendedor';
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
    console.log('No Firebird = ' + req.CODIGO_VENDEDOR + ' ' + req.NOME + ' *********** ');
    const [vendedor, created] = await Vendedor.findOrCreate({
        where: {
            id: req.CODIGO_VENDEDOR
        },
        defaults: {
            "situacao": req.SITUACAO,
            "categoria": req.CATEGORIA,
            "cpf_cnpj": req.CPF_CNPJ,
            "nome": req.NOME,
            "observacao": req.OBSERVACAO,
            "forca_venda": req.FORCA_VENDA,
            "comissionado": req.COMISSIONADO,
            "comissao_base_pagamento": req.COMISSAO_BASE_PAGAMENTO,
            "comissao_base_apuracao": req.COMISSAO_BASE_APURACAO,
            "comissao_produto": req.COMISSAO_,
            "comissao_cta_debito_inclusao": req.COMISSAO_CTA_DEBITO_INCLUSAO,
            "comissao_cta_credito_inclusao": req.COMISSAO_CTA_CREDITO_INCLUSAO,
            "comissao_cta_debito_liquidacao": req.COMISSAO_CTA_DEBITO_LIQUIDACAO,
            "comissao_cta_credito_liquidacao": req.COMISSAO_CTA_CREDITO_LIQUIDACAO,
            "cr_fornecedor": req.CR_FORNECEDOR,
            "codigo_fornecedor": req.CODIGO_FORNECEDOR,
            "cr_plano_conta_gerencial": req.CR_PLANO_CONTA_GERENCIAL,
            "numero_plano_conta_gerencia": req.NUMERO_PLANO_CONTA_GERENCIAL,
            "cr_centro_custo": req.CR_CENTRO_CUSTO,
            "codigo_centro_custo": req.CODIGO_CENTRO_CUSTO,
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
        console.log(vendedor.id);
    } else {
        let dtFb = null;
        let dtMy = null;
        let hhFb = null;
        let hhMy = null;

        if (req.ALTERACAO_DATA != null) {
            dtFb = moment(req.ALTERACAO_DATA).format('YYYY-MM-DD');
            hhFb = moment(req.ALTERACAO_HORA,'hh:mm:ss').format('hh:mm:ss');
        }
        if (vendedor.alteracao_data != null) {
            dtMy = moment(vendedor.alteracao_data).format('YYYY-MM-DD');
            hhMy = moment(vendedor.alteracao_hora, 'hh:mm:ss').format('hh:mm:ss');
        }
        if ((dtFb != dtMy) || (hhFb != hhMy)) {
            console.log('*********** updated *************');
            console.log('DATA FB ' + dtFb + ' ' + hhFb);
            console.log('DATA My ' + dtMy + ' ' + hhMy);
            await Vendedor.update({
                "situacao": req.SITUACAO,
                "categoria": req.CATEGORIA,
                "cpf_cnpj": req.CPF_CNPJ,
                "nome": req.NOME,
                "observacao": req.OBSERVACAO,
                "forca_venda": req.FORCA_VENDA,
                "comissionado": req.COMISSIONADO,
                "comissao_base_pagamento": req.COMISSAO_BASE_PAGAMENTO,
                "comissao_base_apuracao": req.COMISSAO_BASE_APURACAO,
                "comissao_produto": req.COMISSAO_,
                "comissao_cta_debito_inclusao": req.COMISSAO_CTA_DEBITO_INCLUSAO,
                "comissao_cta_credito_inclusao": req.COMISSAO_CTA_CREDITO_INCLUSAO,
                "comissao_cta_debito_liquidacao": req.COMISSAO_CTA_DEBITO_LIQUIDACAO,
                "comissao_cta_credito_liquidacao": req.COMISSAO_CTA_CREDITO_LIQUIDACAO,
                "cr_fornecedor": req.CR_FORNECEDOR,
                "codigo_fornecedor": req.CODIGO_FORNECEDOR,
                "cr_plano_conta_gerencial": req.CR_PLANO_CONTA_GERENCIAL,
                "numero_plano_conta_gerencia": req.NUMERO_PLANO_CONTA_GERENCIAL,
                "cr_centro_custo": req.CR_CENTRO_CUSTO,
                "codigo_centro_custo": req.CODIGO_CENTRO_CUSTO,
                "inclusao_usuario": req.INCLUSAO_USUARIO,
                "inclusao_data": req.INCLUSAO_DATA,
                "inclusao_hora": `${req.INCLUSAO_HORA.getHours()}:${req.INCLUSAO_HORA.getMinutes()}:${req.INCLUSAO_HORA.getSeconds()}`,
                "alteracao_usuario": req.ALTERACAO_USUARIO,
                "alteracao_data": req.ALTERACAO_DATA,
                "alteracao_hora": `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`
            }, {
                where: {
                    id: req.CODIGO_VENDEDOR
                }
            });
        }
    }
}
