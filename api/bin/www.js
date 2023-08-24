const express = require("express");
const tapsRoute = require("../routes/tapsRoute");
const authRoute = require("../routes/authRoute");
const servedRoute = require("../routes/servedRoute");
const resetRoute = require("../routes/resetRoute");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const mongoDbUrl =
  process.env.MONGODB_URL || "mongodb://mongodb:27017/taplist-klm";
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
