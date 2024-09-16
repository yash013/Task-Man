require("dotenv").config();
const express = require("express");
const https = require("https");
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
// console.log(process.env);

// const cors = require('cors');
const io = socketIo(server, {
  cors: {
    origin: "https://task-man-pi.vercel.app/",
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://task-man-pi.vercel.app/login",
  methods: ['GET', 'POST', 'UPDATE', 'DELETE'] ,
  allowedHeaders: ['Content-Type', 'Authorization']
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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

dbConfig.connection.on('connected', () => {
  console.log('MongoDB connected');
});

dbConfig.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(1); // Exit the process with an error code
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "client", "build", "index.html"));
  });
}


// require("dotenv").config();
// const express = require("express");
// const cors = require('cors');
// const app = express();

// app.use(express.json());

// const dbConfig = require("./config/dbConfig");
// // const port = process.env.PORT || 5000;

// app.use(cors({
//   origin: process.env.CLIENT_URL || "https://task-man-75wp5fmcd-yash013s-projects.vercel.app", // Use environment variable for client URL
//   methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// const usersRoute = require("./routes/usersRoute");
// const projectsRoute = require("./routes/projectsRoute");
// const tasksRoute = require("./routes/tasksRoute");
// const notificationsRoute = require("./routes/notificationsRoute");

// app.use("/api/users", usersRoute);
// app.use("/api/projects", projectsRoute);
// app.use("/api/tasks", tasksRoute);
// app.use("/api/notifications", notificationsRoute);


// // Consider using a dedicated WebSocket service

// // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // });

// dbConfig.connection.on('connected', () => {
//   console.log('MongoDB connected');
// });

// dbConfig.connection.on('error', (err) => {
//   console.error('MongoDB connection error: ', err);
//   process.exit(1); // Exit the process with an error code
});
