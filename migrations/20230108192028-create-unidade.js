const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_unidade', {
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
      alteracao_hora: DataTypes.TIME,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('t_unidade');
  }
};
