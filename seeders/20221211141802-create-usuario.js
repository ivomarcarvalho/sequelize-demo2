'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('usuario',[{
    nome: 'Ivomar Araújo de Carvalho',
    login: 'ivomar',
    senha:'123',
    chave:123,
    situacao:1,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    nome: 'Marcelo Marques dos Santos',
    login: 'marcelo',
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
