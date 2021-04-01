const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, AvailabilityTable } = require("../../db/models");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.json({user})
  })
);


router.post

module.exports = router;
