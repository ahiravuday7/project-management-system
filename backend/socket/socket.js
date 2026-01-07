const socketIo = require("socket.io");
let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("New User connected", socket.id);

    // join Board room
    socket.on("joinBoard", (boardId) => {
      socket.join(boardId);
      console.log(`User joined board ${boardId}`);
    });

    // leave Board room
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};
const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initSocket, getIo };
