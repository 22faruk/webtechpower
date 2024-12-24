const express = require("express");
const subjectController = require("../controllers/subject-controllers");
const requestLogger = require("../middleware/logger-middleware");

const subjectRouter = express.Router();

//requestLogger ist temporär/placeholder
subjectRouter.post("/create", requestLogger, subjectController.createSubject);
subjectRouter.put("/update", requestLogger, subjectController.updateSubjectContent);
subjectRouter.put("/updatename", requestLogger, subjectController.updateSubjectName);

module.exports = subjectRouter;