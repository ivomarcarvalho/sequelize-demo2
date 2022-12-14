const Mysql = require('../database/mysql');
const Teste = require('../models/Teste');

module.exports = {
    async findOrCreate(id,nome) {
        await Teste.findOrCreate({
            where:{id:id},
            defaults:{id:id,nome:nome}
        })
        
    }
}