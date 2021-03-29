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
    // associations can be defined here
  };
  return Review;
};
