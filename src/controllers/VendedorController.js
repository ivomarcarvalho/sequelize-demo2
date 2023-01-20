const { executeQuery } = require('../database/configFirebird');
const Vendedor = require('../models/Vendedor');
const { Op } = require('sequelize');
module.exports = {
    async index(carga) {
        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where  v.cr_vendedor = ? and v.codigo_vendedor > ? ';
            filtro = ['001', 0];
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
                    console.log('erro c_vendedor(FireBird)');
                } else {
                    if (result.length > 0) {
                        atualiza(result);
                    }
                }
            });
    }
}

async function atualiza(result) {
    await Object.keys(result).forEach(item => {
        createOrUpdate(result[item]);
    })
}

async function createOrUpdate(req) {
    const vendedor = await Vendedor.findByPk(req.CODIGO_VENDEDOR);
    if (vendedor === null) {
        var hora = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        await Vendedor.create({
            "id": req.CODIGO_VENDEDOR,
            "situacao": req.SITUACAO,
            "categoria": req.CATEGORIA,
            "cpf_cnpj": req.CPF_CNPJ,
            "nome": req.NOME,
            "observacao": req.OBSERVACAO,
            "forca_venda": req.FORCA_VENDA,
            "comissionado": req.COMISSIONADO,
            "comissao_base_pagamento": req.COMISSAO_BASE_PAGAMENTO,
            "comissao_base_apuracao": req.COMISSAO_BASE_APURACAO,
            "comissao_produto": req.COMISSAO_PRODUTO,
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
            "inclusao_data": req.INCLUSAO_DATA === null ? new Date() : req.INCLUSAO_DATA,
            "inclusao_hora": req.INCLUSAO_HORA === null ? hora : req.INCLUSAO_HORA,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA === null ? new Date() : req.ALTERACAO_DATA,
            "alteracao_hora": req.ALTERACAO_HORA === null ? hora : req.ALTERACAO_HORA
        })
    } else {
        await Vendedor.update({
            "id": req.CODIGO_VENDEDOR,
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
                id: req.CODIGO_VENDEDOR,
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
};