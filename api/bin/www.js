const express = require("express");
const tapsRoute = require("../routes/tapsRoute");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request body

app.use("/", tapsRoute);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
