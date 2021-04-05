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

router.get("/:id", asyncHandler (async (req, res) => {
  const {id} = req.params
  const tasks = await CurrentTask.findByPk(id)
  res.json(tasks)
}))

router.post('/new', asyncHandler(async (req, res, next) => {
  const {
    clientId,
    developerId,
    message,
    startTime,
    endTime,
    pending,
    completed,
  } = req.body;
  console.log(typeof clientId, typeof developerId);
  const newTask = await CurrentTask.create({
    clientId,
    developerId,
    message,
    startTime,
    endTime,
    pending,
    completed,
  });
  res.json(newTask)
}))

router.put('/update', asyncHandler(async (req, res, next) => {
  const {taskId} = req.body

  const task = await CurrentTask.findByPk(Number(taskId))
  task.pending = false
  task.completed = true
  const savedTask = await task.save()
  console.log(task)
  res.json(savedTask)

}))

module.exports = router
