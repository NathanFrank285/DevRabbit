const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, CurrentTask, Review } = require("../../db/models");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const tasks = await CurrentTask.findAll({where: {developerId: user.id}})

    const reviews = await Review.findAll({ where: { developerId: user.id },
  });

  const reviewerIds = reviews.map((review) => review.clientId)

  const reviewers = await User.findAll({
    where: {
      id: reviewerIds
    }
  })
console.log(user, tasks, reviews, reviewers);

    res.json({user, tasks, reviews, reviewers})
  })
);


router.post

module.exports = router;
