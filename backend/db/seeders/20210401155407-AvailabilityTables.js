'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
        "AvailabilityTables",
        [
          {
            userId: 1,
            startTime: "April 1, 2021",
            endTime: "April 2, 2021",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            startTime: "April 1, 2021",
            endTime: "April 2, 2021",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 3,
            startTime: "April 1, 2021",
            endTime: "April 2, 2021",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete("AvailabilityTables", null, {});
  }
};
