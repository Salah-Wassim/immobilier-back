'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Annonces', [
      {
        title:"Annonce1",
        price:455,
        secteur:"secteur1",
        nbRoom:5,
        description:"blablabla",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title:"Annonce2",
        price:4894,
        secteur:"secteur2",
        nbRoom:2,
        description:"blablabla",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
