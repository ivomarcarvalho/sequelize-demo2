const {Sequelize,DataTypes} = require('sequelize');
const Mysql = require('../database/mysql');

const Teste = Mysql.define('teste',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
    nome:DataTypes.STRING
});
module.exports  = Teste