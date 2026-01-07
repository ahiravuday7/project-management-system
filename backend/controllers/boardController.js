const Board = require("../models/Board");

//create board
exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
      members: [req.user.id],
    });
    console.log("USER: ", req.user);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get my boards
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      members: req.user.id,
    }).populate("createdBy", "name email");

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
