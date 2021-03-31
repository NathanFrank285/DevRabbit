'use strict';
module.exports = (sequelize, DataTypes) => {
  const AvailabilityTable = sequelize.define('AvailabilityTable', {
    userId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {});
  AvailabilityTable.associate = function(models) {
    AvailabilityTable.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return AvailabilityTable;
};
