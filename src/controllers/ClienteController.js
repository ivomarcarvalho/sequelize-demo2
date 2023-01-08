const Cliente = require('../models/Cliente');
const { executeQuery } = require('../database/configFirebird');
const { Op } = require('sequelize');

module.exports = {
    async index(carga) {
        let filtro = [];
        let sWhere = '';
        if (carga === 't') {
            sWhere = 'where  c.cr_cliente = ? and c.codigo_cliente > ? ';
            filtro = ['001',0];
        } else {
            const dt = new Date();
            let dateString = dt.toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '.')
            sWhere = 'where  (c.inclusao_data + 5 >= ?) \
                      or     (c.alteracao_data + 5 >= ?) ';
            filtro = [dateString, dateString];
        }
        let ssql = 'select c.codigo_cliente,\
                           c.situacao,\
                           c.status,\
                           c.cpf_cnpj,\
                           c.inclusao_usuario,\
                           c.inclusao_data,\
                           c.inclusao_hora,\
                           c.alteracao_usuario,\
                           c.alteracao_data,\
                           c.alteracao_hora,\
                           cg.nome_razao_social,\
                           cg.nome_fantasia,\
                           cg.limite_credito_cg, \
                           cge.logradouro,\
                           cge.numero,\
                           cge.complemento,\
                           cge.bairro,\
                           cge.municipio,\
                           cge.uf,\
                           cge.fone_1,\
                           cge.fone_2,\
                           cge.celular \
                    from   c_cliente c \
                           inner join c_cadastro_geral cg on cg.cpf_cnpj = c.cpf_cnpj \
                           inner join c_cadastro_geral_endereco cge on cge.cpf_cnpj = cg.cpf_cnpj ' +
            sWhere +
            'order by c.codigo_cliente ';
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
    const cliente = await Cliente.findOne({
        where: {
            id: req.CODIGO_CLIENTE
        }
    })
    if (cliente === null) {
        await Cliente.create({
            "id": req.CODIGO_CLIENTE,
            "situacao": req.SITUACAO,
            "status": req.STATUS,
            "cpf_cnpj": req.CPF_CNPJ,
            "nome_razao_social": req.NOME_RAZAO_SOCIAL,
            "nome_fantasia": req.NOME_FANTASIA,
            "limite": req.LIMITE_CREDITO_CG,
            "limite_d": 0,
            "logradouro": req.LOGRADOURO,
            "numero": req.NUMERO,
            "complemento": req.COMPLEMENTO,
            "bairro": req.BAIRRO,
            "municipio": req.MUNICIPIO,
            "uf": req.UF,
            "fone1": req.FONE_1,
            "fone2": req.FONE_2,
            "celular": req.CELULAR,
            "limite": req.LIMITE_CREDITO_CG,
            "limite_d": req.LIMITE_CREDITO_CG,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": `${req.INCLUSAO_HORA.getHours()}:${req.INCLUSAO_HORA.getMinutes()}:${req.INCLUSAO_HORA.getSeconds()}`,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`
        })
    } else {
        await Cliente.update({
            "id": req.CODIGO_CLIENTE,
            "situacao": req.SITUACAO,
            "status": req.STATUS,
            "cpf_cnpj": req.CPF_CNPJ,
            "nome_razao_social": req.NOME_RAZAO_SOCIAL,
            "nome_fantasia": req.NOME_FANTASIA,
            "limite": req.LIMITE_CREDITO_CG,
            "limite_d": 0,
            "logradouro": req.LOGRADOURO,
            "numero": req.NUMERO,
            "complemento": req.COMPLEMENTO,
            "bairro": req.BAIRRO,
            "municipio": req.MUNICIPIO,
            "uf": req.UF,
            "fone1": req.FONE_1,
            "fone2": req.FONE_2,
            "celular": req.CELULAR,
            "limite": req.LIMITE_CREDITO_CG,
            "limite_d": req.LIMITE_CREDITO_CG,
            "inclusao_usuario": req.INCLUSAO_USUARIO,
            "inclusao_data": req.INCLUSAO_DATA,
            "inclusao_hora": `${req.INCLUSAO_HORA.getHours()}:${req.INCLUSAO_HORA.getMinutes()}:${req.INCLUSAO_HORA.getSeconds()}`,
            "alteracao_usuario": req.ALTERACAO_USUARIO,
            "alteracao_data": req.ALTERACAO_DATA,
            "alteracao_hora": `${req.ALTERACAO_HORA.getHours()}:${req.ALTERACAO_HORA.getMinutes()}:${req.ALTERACAO_HORA.getSeconds()}`
        }, {
            where: {
                id: req.CODIGO_CLIENTE,
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