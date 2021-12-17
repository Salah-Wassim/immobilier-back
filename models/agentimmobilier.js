'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgentImmobilier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AgentImmobilier.hasMany(models.Annonce)
    }
  };
  AgentImmobilier.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: DataTypes.INTEGER,
    roleAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AgentImmobilier',
  });
  return AgentImmobilier;
};