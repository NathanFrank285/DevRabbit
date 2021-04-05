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
    
      include: [{
        model: AvailabilityTable,
        where: {
          [Op.and]:{
            startTime: {
              [Op.lte]: searchStart,
            },
            endTime: {
              [Op.gte]: searchEnd,
            },
          }
        },
      },
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
  //todo get the list of user ids that have current availability, map over them for an array of their ids, then use the list of ids to check for any overlap on teh current tasks, i.e. a current task start time/end time is not between either of the searched times

 res.json({devs})
}))

module.exports = router
