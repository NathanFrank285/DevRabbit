const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();


router.get("/:type", asyncHandler( async (req, res) => {
  const {type} = req.params
  const devs = await User.findAll({
    // include: AvailabilityTable,
    where: {
      specialty: type
    }
  })
  res.json({devs})
}))

module.exports = router
