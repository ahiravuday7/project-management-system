const express = require("express");
const {
  createColumn,
  getColumns,
} = require("../controllers/columnColntroller");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();
// only admin and manager can create a column
router.post("/", protect, authorizeRoles("Admin", "Manager"), createColumn);

// all members can view the columns
router.get("/:boardId", protect, getColumns);

module.exports = router;
