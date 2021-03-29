'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurrentTask = sequelize.define('CurrentTask', {
    clientId: DataTypes.INTEGER,
    developerId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    pending: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN
  }, {});
  CurrentTask.associate = function(models) {
    // associations can be defined here
  };
  return CurrentTask;
};