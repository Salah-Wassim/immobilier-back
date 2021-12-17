'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KeyWord.hasMany(models.KeyWordAnnonce);
      KeyWord.belongsToMany(models.Annonce, {
        through: models.KeyWordAnnonce
      })
    }
  };
  KeyWord.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KeyWord',
  });
  return KeyWord;
};