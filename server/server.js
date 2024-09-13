require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: ['https://task-man-pi.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const projectsRoute = require("./routes/projectsRoute");
const tasksRoute = require("./routes/tasksRoute");
const notificationsRoute = require("./routes/notificationsRoute");

app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/notifications", notificationsRoute);

const dbConfig = require("./config/dbConfig");

// Serve static files from the React app
const path = require("path");
__dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

dbConfig.connection.on('connected', () => {
  console.log('MongoDB connected');
});

dbConfig.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(1);
});

// Uncomment and use this if you need to use io in other files
// module.exports = { io };