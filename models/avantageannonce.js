'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvantageAnnonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AvantageAnnonce.belongsTo(models.Annonce);
      AvantageAnnonce.belongsTo(models.Avantage);
    }
  };
  AvantageAnnonce.init({
  }, {
    sequelize,
    modelName: 'AvantageAnnonce',
  });
  return AvantageAnnonce;
};