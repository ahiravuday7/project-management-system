const express = require("express");

const { createBoard, getBoards } = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin & Manager can create a board
// POST: /api/boards/
router.post("/", protect, authorizeRoles("Admin", "Manager"), createBoard);

//All logged in users can get their boards
// GET: /api/boards/
router.get("/", protect, getBoards);

module.exports = router;
