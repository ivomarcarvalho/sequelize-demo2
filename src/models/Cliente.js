const { Sequelize, DataTypes } = require('sequelize');
const Mysql = require('../database/mysql');

const Cliente = Mysql.define('c_cliente', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  situacao:DataTypes.STRING(1),
  status:DataTypes.SMALLINT,
  cpf_cnpj: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  nome_razao_social: {
    type: DataTypes.STRING(60)
  },
  nome_fantasia:DataTypes.STRING(60),
  end_logradouro:DataTypes.STRING(60),
  end_numero:DataTypes.STRING(60),
  end_complemento:DataTypes.STRING(60),
  end_bairro:DataTypes.STRING(60),
  end_municipio:DataTypes.STRING(60),
  end_uf:DataTypes.STRING(2),
  fone1:DataTypes.STRING(11),
  fone2:DataTypes.STRING(11),
  celular:DataTypes.STRING(11),
  limite: DataTypes.DOUBLE,
  limite_d:DataTypes.DOUBLE,
  inclusao_usuario: DataTypes.STRING(40),
  inclusao_data: DataTypes.DATEONLY,
  inclusao_hora: DataTypes.TIME,
  alteracao_usuario: DataTypes.STRING(40),
  alteracao_data: DataTypes.DATEONLY,
  alteracao_hora: DataTypes.TIME
});

module.exports = Cliente