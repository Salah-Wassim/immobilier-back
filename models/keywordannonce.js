'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyWordAnnonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KeyWordAnnonce.belongsTo(models.KeyWord);
      KeyWordAnnonce.belongsTo(models.Annonce);
    }
  };
  KeyWordAnnonce.init({
  }, {
    sequelize,
    modelName: 'KeyWordAnnonce',
  });
  return KeyWordAnnonce;
};