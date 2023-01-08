const Mysql = require('../database/mysql');
const { DataTypes } = require('sequelize');

const Receber = Mysql.define('f_receber',{
    numero_titulo: {
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      sequencia_operacao:DataTypes.INTEGER,
      dt_emissao:DataTypes.DATEONLY,
      dt_vencimento:DataTypes.DATEONLY,
      dt_quitacao:DataTypes.DATEONLY,
      clienteId: DataTypes.INTEGER,
      vendedorId:DataTypes.INTEGER,
      situacao: DataTypes.INTEGER,
      vlr_titulo:DataTypes.DOUBLE,
      vlr_recebido:DataTypes.DOUBLE,
      vlr_areceber:DataTypes.DOUBLE,
      atraso:DataTypes.INTEGER,
      inclusao_usuario: DataTypes.STRING(40),
      inclusao_data: DataTypes.DATEONLY,
      inclusao_hora: DataTypes.TIME,
      alteracao_usuario: DataTypes.STRING(40),
      alteracao_data: DataTypes.DATEONLY,
      alteracao_hora: DataTypes.TIME
}); 

module.exports = Receber