const express = require("express");

const tapsRouter = require("./routes/taps");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// route setup

app.use("/", tapsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
