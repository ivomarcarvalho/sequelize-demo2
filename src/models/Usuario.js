const {DataTypes, Sequelize} = require('sequelize');
const Mysql = require('../database/mysql');

const Usuario = Mysql.define ('t_usuario',{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      situacao: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      master: Sequelize.SMALLINT,
      nome: Sequelize.STRING(60),
      login: Sequelize.STRING(25),
      senha: Sequelize.STRING(6),
      observacao: Sequelize.BLOB,
      inclusao_usuario: Sequelize.STRING(40),
      inclusao_data: DataTypes.DATEONLY,
      inclusao_hora: Sequelize.TIME,
      alteracao_usuario: Sequelize.STRING(40),
      alteracao_data: DataTypes.DATEONLY,
      alteracao_hora: DataTypes.TIME
});

module.exports = Usuario

