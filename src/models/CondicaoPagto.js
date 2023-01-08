const { Sequelize, DataTypes } = require('sequelize');
const Mysql = require('../database/mysql');

const Condicao_pagto = Mysql.define('t_condicao_pagto', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    prazo: DataTypes.STRING(20),
    inclusao_usuario: DataTypes.STRING(40),
    inclusao_data: DataTypes.DATEONLY,
    inclusao_hora: DataTypes.TIME,
    alteracao_usuario: DataTypes.STRING(40),
    alteracao_data: DataTypes.DATEONLY,
    alteracao_hora: DataTypes.TIME,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = Condicao_pagto