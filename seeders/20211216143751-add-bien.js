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
    await queryInterface.bulkInsert('Biens', [
      {
        name: 'Maison',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Appartement',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bureaux',
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
