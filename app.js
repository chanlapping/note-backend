const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config.js");
const logger = require("./utils/logger.js");
const middleware = require("./utils/middleware.js");
const notesRouter = require("./controllers/notes.js");

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to Mongo DB");
  })
  .catch((error) => {
    logger.error("error connecting to Mongo DB", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
