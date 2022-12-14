module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('teste', {
       id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
       },
      nome:Sequelize.STRING,
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE
     });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('teste');
  }
};
