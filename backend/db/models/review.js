"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      clientId: DataTypes.INTEGER,
      developerId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      taskId: DataTypes.INTEGER,
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, {foreignKey: 'clientId'})
    Review.belongsTo(models.User, {foreignKey: 'developerId'})
    Review.belongsTo(models.CurrentTask, {foreignKey: 'taskId'})
  };
  return Review;
};
