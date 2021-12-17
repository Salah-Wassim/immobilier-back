'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bien extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bien.hasMany(models.Annonce)
    }
  };
  Bien.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bien',
  });
  return Bien;
};