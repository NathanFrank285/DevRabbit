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
    CurrentTask.hasMany(models.Review,{foreignKey: "taskId"})
    CurrentTask.belongsTo(models.User, { foreignKey: "clientId" });
    CurrentTask.belongsTo(models.User, { foreignKey: "developerId" });
  };
  return CurrentTask;
};
