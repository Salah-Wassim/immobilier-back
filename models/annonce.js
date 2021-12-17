'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Annonce.belongsTo(models.AgentImmobilier);
      Annonce.belongsTo(models.Bien);
      Annonce.hasMany(models.AvantageAnnonce)
      Annonce.belongsToMany(models.Avantage, {
        through: models.AvantageAnnonce
      })
      Annonce.hasMany(models.KeyWordAnnonce)
      Annonce.belongsToMany(models.KeyWord, {
        through: models.KeyWordAnnonce
      })
    }
  };
  Annonce.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    secteur: DataTypes.STRING,
    nbRoom: DataTypes.INTEGER,
    description: DataTypes.STRING,
    avantage: DataTypes.STRING,
    keyWord: DataTypes.STRING,
    //realtorAgent: DataTypes.BOOLEAN,
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Annonce',
  });
  return Annonce;
};