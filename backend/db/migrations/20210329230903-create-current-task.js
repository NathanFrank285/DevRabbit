'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "CurrentTasks",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          unique: "unique_task_constraint",
        },
        clientId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: "unique_task_constraint",
        },
        developerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: "unique_task_constraint",
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        startTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        pending: {
          type: Sequelize.BOOLEAN,
        },
        completed: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          unique_task_constraint: {
            fields: ["id", "clientId", "developerId"],
          },
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CurrentTasks');
  }
};
