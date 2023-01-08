const Produto = require('../models/Produto');
const { executeQuery } = require('../database/configFirebird');
const { Op } = require('sequelize');
const ProdutoPreco = require('../models/ProdutoPreco');

module.exports = {
    async index(carga) {
        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where p.cr_produto = ? and p.codigo_produto >= ?';
            filtro = ['001', 0];
        } else {
            const dt = new Date();
            let dateString = dt.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '.')
            sWhere = 'where  (p.inclusao_data + 5 >= ?) \
                      or     (p.alteracao_data + 5 >= ?) ';
            filtro = [dateString, dateString];
        }
        let ssql = 'select p.codigo_produto,\
                           p.descricao,\
                           p.ucom,\
                           p.status,\
                           p.inclusao_usuario,\
                           p.inclusao_data,\
                           p.inclusao_hora,\
                           p.alteracao_usuario,\
                           p.alteracao_data,\
                           p.alteracao_hora, \
                           pp.sequencia_preco,\
                           pp.preco_venda, \
                           pp.inclusao_usuario inc_usuario,\
                           pp.inclusao_data    inc_data,\
                           pp.inclusao_hora    inc_hora,\
                           pp.alteracao_usuario alt_usuario,\
                           pp.alteracao_data    alt_data,\
                           pp.alteracao_hora    alt_hora \
                    from   c_produto p \
                           inner join c_produto_preco pp on  p.cr_produto     = pp.cr_produto \
                                                         and p.codigo_produto = pp.codigo_produto '+ 
            sWhere +
            'order by p.cr_produto, p.codigo_produto ';
        executeQuery(ssql, filtro,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(result.length)
                    if (result.length > 0) {
                        console.log('***** '+result.length+' produto(s) selecionado(s) ***** ');
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
    const produto = await Produto.findOne({
        where: {
            id: req.CODIGO_PRODUTO
        }
    })
    if (produto === null) {
        await Produto.create({
            "id": req.CODIGO_PRODUTO,
            "descricao": req.DESCRICAO,
            "status": req.STATUS,
            "ucom": req.UCOM,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": req.INCLUSAO_HORA,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": req.ALTERACAO_HORA
        })
    } else {
        await Produto.update({
            "id": req.CODIGO_PRODUTO,
            "descricao": req.DESCRICAO,
            "status": req.STATUS,
            "ucom": req.UCOM,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": req.INCLUSAO_HORA,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": req.ALTERACAO_HORA
        }, {
            where: {
                id: req.CODIGO_PRODUTO,
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
    const produtoPreco = await ProdutoPreco.findOne({
        where:{
            produtoId: req.CODIGO_PRODUTO,
            tabelaId: req.SEQUENCIA_PRECO
        }
    })
    if (produtoPreco === null) {
        await ProdutoPreco.create({
            "produtoId": req.CODIGO_PRODUTO,
            "tabelaId": req.SEQUENCIA_PRECO,
            "valor": req.PRECO_VENDA,
            "inclusao_usuario": req.INC_USUARIO,
            "inclusao_data": req.INC_DATA,
            "inclusao_hora": req.INC_HORA,
            "alteracao_usuario": req.ALT_USUARIO,
            "alteracao_data": req.ALT_DATA,
            "alteracao_hora": req.ALT_HORA
        })
    }else{
        await ProdutoPreco.update({
            "produtoId": req.CODIGO_PRODUTO,
            "tabelaId": req.SEQUENCIA_PRECO,
            "valor": req.PRECO_VENDA,
            "inclusao_usuario": req.INC_USUARIO,
            "inclusao_data": req.INC_DATA,
            "inclusao_hora": req.INC_HORA,
            "alteracao_usuario": req.ALT_USUARIO,
            "alteracao_data": req.ALT_DATA,
            "alteracao_hora": req.ALT_HORA
        },{
            where:{
                produtoId: req.CODIGO_PRODUTO,
                tabelaId: req.SEQUENCIA_PRECO,
                [Op.or]: [{
                    alteracao_data: {
                        [Op.lt]: req.ALT_DATA
                    }
                },
                {
                    [Op.and]: [
                        {
                            alteracao_data: {
                                [Op.eq]: req.ALT_DATA
                            },
                        },
                        {
                            alteracao_hora: {
                                [Op.lt]: `${req.ALT_HORA.getHours()}:${req.ALT_HORA.getMinutes()}:${req.ALT_HORA.getSeconds()}`
                            }
                        }
                    ]
                }]
           }    
        })
    }
}