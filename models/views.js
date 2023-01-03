'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Views extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.News, {
        foreignKey: "newsId",
        as: "news",
      });
    }
  }
  Views.init({
    newsId: DataTypes.INTEGER,
    desktopIP: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Views',
    updatedAt: false
  });
  return Views;
};