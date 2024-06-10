require("dotenv").config();

const PORT = process.env.PORT;
const password = process.env.MONGODB_PASSWORD;
const MONGODB_URI = `mongodb+srv://fullstack:${password}@cluster0.g8xyl1a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

module.exports = {
  MONGODB_URI,
  PORT,
};
