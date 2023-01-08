const Mysql = require('../database/mysql');
const { Sequelize, DataTypes } = require('sequelize');
const Vendedor = Mysql.define('c_vendedor', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  situacao: DataTypes.STRING(1),
  categoria: DataTypes.SMALLINT,
  cpf_cnpj: DataTypes.STRING(14),
  nome: DataTypes.STRING(40),
  observacao: DataTypes.BLOB,
  forca_venda: DataTypes.SMALLINT,
  comissionado: DataTypes.SMALLINT,
  comissao_base_pagamento: DataTypes.SMALLINT,
  comissao_base_apuracao: DataTypes.SMALLINT,
  comissao_produto: DataTypes.SMALLINT,
  comissao_cta_debito_inclusao: DataTypes.STRING(10),
  comissao_cta_credito_inclusao: DataTypes.STRING(10),
  comissao_cta_debito_liquidacao: DataTypes.STRING(10),
  comissao_cta_credito_liquidacao: DataTypes.STRING(10),
  cr_fornecedor: DataTypes.STRING(3),
  codigo_fornecedor: DataTypes.INTEGER,
  cr_plano_conta_gerencial: DataTypes.STRING(3),
  numero_plano_conta_gerencia: DataTypes.STRING(6),
  cr_centro_custo: DataTypes.STRING(3),
  codigo_centro_custo: DataTypes.STRING(7),
  inclusao_usuario: DataTypes.STRING(40),
  inclusao_data: DataTypes.DATEONLY,
  inclusao_hora: DataTypes.TIME,
  alteracao_usuario: DataTypes.STRING(40),
  alteracao_data: DataTypes.DATEONLY,
  alteracao_hora: DataTypes.TIME
});
module.exports = Vendedor
