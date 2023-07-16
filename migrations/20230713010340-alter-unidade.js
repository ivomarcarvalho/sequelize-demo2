const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('t_unidade', 'colunaNova2', {
          type: Sequelize.DataTypes.STRING,
          after: 'descricao',
        }, { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('t_unidade', 'colunaNova2', { transaction: t }),
      ]);
    });
  }
};