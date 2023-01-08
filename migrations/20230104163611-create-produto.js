const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('c_produto', {
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
      alteracao_hora: DataTypes.TIME,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('c_produto');
  }
};
