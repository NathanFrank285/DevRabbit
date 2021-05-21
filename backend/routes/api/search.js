const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var isWithinInterval = require("date-fns/isWithinInterval");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, AvailabilityTable, CurrentTask } = require("../../db/models");

const router = express.Router();


router.get("/:type/:startTime/:endTime", asyncHandler( async (req, res) => {
  const {type, startTime: searchStart, endTime: searchEnd} = req.params

  const devs = await User.findAll({
    where: {
      specialty: type,
    },
    //todo check for only dates that are under current tasks, i.e. the search value should not fall within the values that  developer is currently working on a project, then they could be booked for any other days in theory. Then there would be calendar/messaging for the user and dev to coordinate any dates further. But we want to reduce the overhead of a dveloper having to constantly update their availability. Should add a not available option, include a specializations table
      include: [
      //   {
      //   model: AvailabilityTable,
      //   where: {
      //     [Op.and]:{
      //       startTime: {
      //         [Op.lte]: searchStart,
      //       },
      //       endTime: {
      //         [Op.gte]: searchEnd,
      //       },
      //     }
      //   },
      // },
      {model: CurrentTask,
      where: {
        [Op.and]:{
          startTime: {
            [Op.notBetween]: [searchStart, searchEnd],
          },
          endTime: {
            [Op.notBetween]: [searchStart, searchEnd],
          },
        }
      }}
    ]
  });

  // const devIds = devs.map(dev => dev.id);

  // const availDevs = await CurrentTask.findAll({
  //   where: {
  //     userId: devIds
  //   },
  // })

  console.log("I AM THE AVAIL DEVS",devs)

 res.json({devs})
}))

module.exports = router
