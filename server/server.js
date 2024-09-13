require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
// console.log(process.env);
const cors = require('cors');
const io = socketIo(server, {
  cors: {
    origin: "https://task-man-pi.vercel.app/" , // Use environment variable for client URL
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

const dbConfig = require("./config/dbConfig");
// const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://task-man-pi.vercel.app/',
  methods: ['GET', 'POST', 'UPDATE', 'DELETE'] // or your client's URL
}));

// console.log("MongoDB_URI:", process.env.MONGODB_URI);

const usersRoute = require("./routes/usersRoute");
const projectsRoute = require("./routes/projectsRoute");
const tasksRoute = require("./routes/tasksRoute");
const notificationsRoute = require("./routes/notificationsRoute");

app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/notifications", notificationsRoute);

// Serve static files from the React app
const path = require("path");
dirname = path.resolve();
app.use(express.static(path.join(dirname, 'client/build')));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "client", "build", "index.html"));
  });
}

// server.listen(port, () => {
//   console.log(Server is running on port ${port});
// });

dbConfig.connection.on('connected', () => {
  console.log('MongoDB connected');
});

dbConfig.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(1); // Exit the process with an error code
});