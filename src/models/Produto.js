const { DataTypes } = require('sequelize');
const Mysql = require('../database/mysql');
const ProdutoPreco = require('./ProdutoPreco');

const Produto = Mysql.define('c_produto', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    embalagem: DataTypes.STRING(15),
    ucom: DataTypes.STRING(6),
    "status": DataTypes.SMALLINT,
    estoque: DataTypes.DOUBLE,
    pesopadrao: DataTypes.DOUBLE,
    inclusao_usuario: DataTypes.STRING(40),
    inclusao_data: DataTypes.DATEONLY,
    inclusao_hora: DataTypes.TIME,
    alteracao_usuario: DataTypes.STRING(40),
    alteracao_data: DataTypes.DATEONLY,
    alteracao_hora: DataTypes.TIME
});

Produto.hasMany(ProdutoPreco,{foreignKey: 'produtoId'});

module.exports = Produto