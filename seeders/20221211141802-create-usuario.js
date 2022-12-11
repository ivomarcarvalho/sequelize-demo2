'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('usuario',[{
    nome: 'Ivomar Araújo de Carvalho',
    login: 'ivomar',
    senha:'123',
    chave:123,
    situacao:1,
    createdAt: new Date(),
    updatedAt: new Date()
   }],{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuario',null,{});
  }
};
