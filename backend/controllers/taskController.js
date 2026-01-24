const Task = require("../models/Task");
const { getIo } = require("../socket/socket");

// Create a new task
// POST: /api/tasks
exports.createTask = async (req, res) => {
  const { title, description, boardId, columnId, assignedTo } = req.body;

  if (!title || !boardId || !columnId) {
    return res
      .status(400)
      .json({ message: "Title, boardId, and columnId are required" });
  }
  try {
    const task = await Task.create({
      title,
      description,
      boardId,
      columnId,
      assignedTo: assignedTo || null,
      createdBy: req.user.id,
    });

    // populate before sending to client
    const populatedTask = await task.populate("assignedTo", "name email");

    // socket EMIT
    const io = getIo();
    io.to(boardId).emit("taskCreated", populatedTask);

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks for a specific board
// GET: /api/tasks/:boardId
exports.getTasks = async (req, res) => {
  try {
    console.log(req.params);
    const tasks = await Task.find({
      boardId: req.params.boardId,
    })
      .populate("assignedTo", "name email")
      .sort("createdAt");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task (move, assign, edit)
// PUT: /api/tasks/:taskId
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const io = getIo();
    io.to(task.boardId.toString()).emit("taskUpdated", task);

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
// DELETE: /api/tasks/:taskId
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    const io = getIo();
    io.to(task.boardId.toString()).emit("taskDeleted", task._id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Start a timer for a task
exports.startTimer = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task.timer.isRunning) {
    task.timer.isRunning = true;
    task.timer.startedAt = new Date();
    await task.save();
  }
  res.json(task);
};

//Stop a timer for a task
exports.stopTimer = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.timer.isRunning) {
    const diff = (Date.now() - task.timer.startedAt.getTime()) / 1000;
    task.timer.totalSeconds += Math.floor(diff);
    task.timer.isRunning = false;
    task.timer.startedAt = null;
    await task.save();
  }
  res.json(task);
};
