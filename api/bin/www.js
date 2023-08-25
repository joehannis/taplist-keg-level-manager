const express = require("express");
const tapsRoute = require("../routes/tapsRoute");
const authRoute = require("../routes/authRoute");
const servedRoute = require("../routes/servedRoute");
const resetRoute = require("../routes/resetRoute");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("DB_USER", process.env["DB_USER"]);
console.log("DB_PASSWORD", process.env["DB_PASSWORD"]);
console.log("DB_HOST", process.env["DB_HOST"]);
console.log("DB_PORT", process.env["DB_PORT"]);
console.log("DB_NAME", process.env["DB_NAME"]);

const mongoDbUrl = `mongodb://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@${process.env["DB_HOST"]}:${process.env["DB_PORT"]}/${process.env["DB_NAME"]}?authSource=admin`;
mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

app.use("/taps", tapsRoute);
app.use("/auth", authRoute);
app.use("/served", servedRoute);
app.use("/reset", resetRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
