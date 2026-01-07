const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const columnRoutes = require("./routes/columnRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { initSocket } = require("./socket/socket");

dotenv.config(); // Load environment variables from .env file

const connectDB = require("./config/db"); // Import the database connection function
connectDB();

const app = express(); // Create an Express application
const server = http.createServer(app); // Create an HTTP server using the Express app

// Initialize Socket.io with the server
initSocket(server);

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);

// Test Routes
app.get("/", (req, res) => {
  res.send("Project Management API Running");
});
app.get("/:id", (req, res) => {
  res.send("Project Management API Running");
});

const PORT = process.env.PORT || 5000; // Define the port to listen on
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
