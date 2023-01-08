const { DataTypes } = require('sequelize');
const Mysql = require('../database/mysql');

const ProdutoPreco = Mysql.define('c_produto_preco', {
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    tabelaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    valor: DataTypes.DOUBLE,
    inclusao_usuario: DataTypes.STRING(40),
    inclusao_data: DataTypes.DATEONLY,
    inclusao_hora: DataTypes.TIME,
    alteracao_usuario: DataTypes.STRING(40),
    alteracao_data: DataTypes.DATEONLY,
    alteracao_hora: DataTypes.TIME,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
});

module.exports = ProdutoPreco