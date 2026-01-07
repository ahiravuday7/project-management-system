const Task = require("../models/Task");
const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  startTimer,
  stopTimer,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
// const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// create a task
router.post("/", protect, createTask);

// get tasks
router.get("/:boardId", protect, getTasks);

// update a task
router.put("/:id", protect, updateTask);

// delete a task
router.delete("/:id", protect, deleteTask);

// start a timer for a task
router.post("/:id/start-timer", protect, startTimer);

// stop a timer for a task
router.post("/:id/stop-timer", protect, stopTimer);
module.exports = router;
