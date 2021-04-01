'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('CurrentTasks', [{
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CurrentTasks', null, {});
  }
};
