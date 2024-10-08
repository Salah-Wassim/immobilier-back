'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Annonces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      secteur: {
        type: Sequelize.STRING
      },
      nbRoom: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      AgentImmobilierId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        References: {
          models: 'AgentImmobiliers',
          Key : 'id'
        }
      },
      BienId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        References: {
          models: 'Biens',
          Key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Annonces');
  }
};