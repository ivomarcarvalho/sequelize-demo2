const { DataTypes, Sequelize } = require('sequelize');
const Mysql = require('../database/mysql');

const Unidade = Mysql.define('t_unidade', {
    ucom: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey: true
    },
    descricao: DataTypes.STRING,
    inclusao_usuario: DataTypes.STRING(40),
    inclusao_data: DataTypes.DATEONLY,
    inclusao_hora: DataTypes.TIME,
    alteracao_usuario: DataTypes.STRING(40),
    alteracao_data: DataTypes.DATEONLY,
    alteracao_hora: DataTypes.TIME
});

module.exports = Unidade

