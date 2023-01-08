const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('c_produto_preco', {
      produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references: {         // produto_preco hasMany produto n:n
          model: 'c_produto',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tabelaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('c_produto_preco');
  }
};
