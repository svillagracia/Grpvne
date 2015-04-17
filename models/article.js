"use strict";
module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define("article", {
    redditId: DataTypes.STRING,
    subreddit: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.article.belongsTo(models.user);
      }
    }
  });
  return article;
};