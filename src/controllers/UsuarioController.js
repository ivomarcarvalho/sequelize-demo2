const mysql = require('../database/mysql');
const Usuario = require('../models/Usuario');

module.exports = {
    async index(req, res) {
        const { id } = req.params;
        let usuario = [];
        if (id == 0) {
            usuario = await Usuario.findAll();
        } else {
            usuario = await Usuario.findOne({where:{cr_usuario:"001", codigo_usuario:id}});
        }
        return res.json(usuario)
    },
    async create(req) {
        console.log("registro(s) selecionados()) : " + req.length)
        await Object.keys(req).forEach(item => {
            console.log('Registro '+item + " = (" + req[item].CODIGO_USUARIO + '-' + req[item].NOME+')');
            Usuario.create({
                "cr_usuario":req[item].CR_USUARIO,
                "codigo_usuario":req[item].CODIGO_USUARIO,
                "nome": req[item].NOME,
                "situacao": req[item].SITUACAO,
                "master": req[item].MASTER,
                "login": req[item].LOGIN,
                "senha": req[item].SENHA,
                "observacao": req[item].OBSERVACAO,
                "inclusao_usuario": req[item].INCLUSAO_USUARIO,
                "inclusao_data": req[item].INCLUSAO_DATA,
                "inclusao_hora": req[item].INCLUSAO_HORA,
                "alteracao_usuario": req[item].ALTERACAO_USUARIO,
                "alteracao_data": req[item].ALTERACAO_DATA,
                "alteracao_hora": req[item].ALTERACAO_HORA
            })
                .then(() => {
                    console.log('inser - deu bom ' + req[item].CODIGO_USUARIO);
                }).catch(() => {
                    console.log('insert - deu ruim ' + req[item].CODIGO_USUARIO);
                });
        });
    },
    async delete(req, res) {
        const id = req.params.id;
        await Usuario.destroy({ where: { id: id } })
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: 'Registro ecluido com sucesso!'
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Usuário não cadastrado!"
                });
            });
    },
    async findOrCreate(req) {
        //console.log("registro(s) selecionados()) : " + req.length)
        await Object.keys(req).forEach(item => {
            //console.log('Registro '+item + " = (" + req[item].CODIGO_USUARIO + '-' + req[item].NOME+')');
            Usuario.findOrCreate({
                where:{cr_usuario:req[item].CR_USUARIO,
                    codigo_usuario:req[item].CODIGO_USUARIO
                },
                defaults:{
                    "cr_usuario":req[item].CR_USUARIO,
                    "codigo_usuario":req[item].CODIGO_USUARIO,
                    "nome": req[item].NOME,
                    "situacao": req[item].SITUACAO,
                    "master": req[item].MASTER,
                    "login": req[item].LOGIN,
                    "senha": req[item].SENHA,
                    "observacao": req[item].OBSERVACAO,
                    "inclusao_usuario": req[item].INCLUSAO_USUARIO,
                    "inclusao_data": req[item].INCLUSAO_DATA,
                    "inclusao_hora": req[item].INCLUSAO_HORA,
                    "alteracao_usuario": req[item].ALTERACAO_USUARIO,
                    "alteracao_data": req[item].ALTERACAO_DATA,
                    "alteracao_hora": req[item].ALTERACAO_HORA
                }
            })

        });
    },

    async update(req, res) {
        const id = req.params.id;
        const reg = req.body;
        console.log(reg); 00
        await User.update(req.body, { where: { id: id } })
            .then(() => {
                return res.status(200).json({
                    id: id,
                    erro: false,
                    messagem: 'Atualizador com sucesso!'
                });
            })
            .catch(() => {
                return res.status(400).json({
                    id: id,
                    erro: true,
                    menssagem: 'falha na atualização'
                });
            })
    }
};