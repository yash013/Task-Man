const mongoose = require("mongoose");

// console.log(process.env);
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://taskmanpro:admin%40123@taskmanpro01.02uut.mongodb.net/?retryWrites=true&w=majority&appName=taskmanpro"
// console.log(uri);
if (!uri) {
    console.error("Error: MONGODB_URI environment variable is not set.");
    process.exit(1); // Exit the process with an error code
}

mongoose.connect(uri);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongo db connected successfully');
});

connection.on('error', (err) => {
    console.log('Mongo db connection error: ', err);
});

module.exports = mongoose;
