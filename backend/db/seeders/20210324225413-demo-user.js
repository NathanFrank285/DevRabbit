"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          fullName: "Mr. Demolition",
          biography: "I like to blow things up",
          hourlyRate: 12,
          specialty: "Python",
        },
        {
          email: faker.internet.email(),
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          fullName: "Fake man",
          biography: "I dont know who I am",
          hourlyRate: 15,
          specialty: "Python",
        },
        {
          email: faker.internet.email(),
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          fullName: "Faker mister man",
          biography: "Just here trying to make some friends",
          hourlyRate: 10,
          specialty: "Ruby",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
