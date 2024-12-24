const express = require("express");
const subjectController = require("../controllers/subject-controllers");
const requestLogger = require("../middleware/logger-middleware");

const subjectRouter = express.Router();

subjectRouter.post("/create", requestLogger, subjectController.createSubject);

module.exports = subjectRouter;