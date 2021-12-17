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
    await queryInterface.bulkInsert('KeyWords', [
      {
        name: 'coup de coeur',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Exeptionnel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vue de rêve',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'emplacement privilégié',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
