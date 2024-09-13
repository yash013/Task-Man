const express = require("express");
const cors = require('cors');
const authMiddleware = require('./authMiddleware');

const app = express();

const corsOptions = {
  origin: ['https://task-man-pi.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware before any routes
app.use(cors(corsOptions));

// Handle OPTIONS requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

app.use(express.json());

// Debug logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Apply auth middleware to protected routes
app.use("/api/projects", authMiddleware, projectsRoute);
app.use("/api/tasks", authMiddleware, tasksRoute);
app.use("/api/notifications", authMiddleware, notificationsRoute);

// The login route should not use auth middleware
app.use("/api/users", usersRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ... rest of your server.js code

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "client", "build", "index.html"));
  });
}


dbConfig.connection.on('connected', () => {
  console.log('MongoDB connected');
});

dbConfig.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
  process.exit(1); // Exit the process with an error code
});