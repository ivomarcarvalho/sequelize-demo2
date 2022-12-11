const Sequelize = require('sequelize');
const Mysql = require('../database/mysql');


const Usuario = Mysql.define ('usuario',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      chave: Sequelize.INTEGER,
      situacao: Sequelize.INTEGER,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
});

module.exports = Usuario

