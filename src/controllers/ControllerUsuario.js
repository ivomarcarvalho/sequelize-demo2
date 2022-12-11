const mysql = require('../database/mysql');
const Usuario = require('../models/Usuario');

module.exports = {
    async index(req, res) {
        const { id } = req.params;
        let usuario = [];
        if (id == 0) {
            usuario = await Usuario.findAll();
        } else {
            usuario = await Usuario.findByPk(id);
        }
        return res.json(usuario)
    }
}