const { executeQuery } = require('../database/configFirebird');
const Vendedor = require('../models/Vendedor');
const { Op } = require('sequelize');
module.exports = {
    async index(req, res) {
        let sWhere = '';
        let filtro = [];
        if (req === 'I') {
            sWhere = 'where  c_vendedor.codigo_vendedor > ? ';
            filtro = [0];
        } else {
            const dt = new Date();
            let dateString = dt.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '.')
            sWhere = 'where  (c_vendedor.inclusao_data + 5 >= ?) \
                      or     (c_vendedor.alteracao_data + 5 >= ?) ';
            filtro = [dateString, dateString];
        }
        let ssql = 'select cr_vendedor,\
                           codigo_vendedor,\
                           situacao,\
                           categoria,\
                           cpf_cnpj,\
                           nome,\
                           cast(observacao as varchar(500)) observacao,\
                           forca_venda,\
                           comissionado,\
                           comissao_base_pagamento,\
                           comissao_base_apuracao,\
                           comissao_produto,\
                           comissao_cta_debito_inclusao,\
                           comissao_cta_credito_inclusao,\
                           comissao_cta_debito_liquidacao,\
                           comissao_cta_credito_liquidacao,\
                           cr_fornecedor,\
                           codigo_fornecedor,\
                           cr_plano_conta_gerencial,\
                           numero_plano_conta_gerencia,\
                           cr_centro_custo,\
                           codigo_centro_custo,\
                           inclusao_usuario,\
                           inclusao_data,\
                           inclusao_hora,\
                           alteracao_usuario,\
                           alteracao_data,\
                           alteracao_hora \
                    from   c_vendedor ' +
            sWhere +
            'order by c_vendedor.cr_vendedor,codigo_vendedor';
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
    const vendedor = await Vendedor.findOne({
        where: {
            cr_vendedor: req.CR_VENDEDOR.trim(),
            codigo_vendedor: req.CODIGO_VENDEDOR
        }
    })
    if (vendedor === null) {
        //console.log(req.CODIGO_VENDEDOR + ' Não localizado no mysql(se fu)')
        await Vendedor.create({
            "cr_vendedor": req.CR_VENDEDOR,
            "codigo_vendedor": req.CODIGO_VENDEDOR,
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
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": `${req.INCLUSAO_HORA.getHours()}:${req.INCLUSAO_HORA.getMinutes()}:${req.INCLUSAO_HORA.getSeconds()}`,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`

        })
    } else {
        await Vendedor.update({
            "cr_vendedor": req.CR_VENDEDOR,
            "codigo_vendedor": req.CODIGO_VENDEDOR,
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
                cr_vendedor: req.CR_VENDEDOR.trim(),
                codigo_vendedor: req.CODIGO_VENDEDOR,
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

        // console.log(vendedor.codigo_vendedor + ' ' + vendedor.nome);
    }
}