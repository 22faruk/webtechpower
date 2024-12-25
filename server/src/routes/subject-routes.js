const express = require("express");
const subjectController = require("../controllers/subject-controllers");
const requestLogger = require("../middleware/logger-middleware");

const subjectRouter = express.Router();

//requestLogger ist temporär/placeholder
//Code guidelines Folie 35, das ist nicht restful
subjectRouter.post("/create", requestLogger, subjectController.createSubject);

//"/users/:userId/subjects" das muss eigentlich in die user-routes
subjectRouter.get("/getsubjects", requestLogger, subjectController.getSubjects);

//subjectRouter.get("/subjects/:subjectId/directories", requestLogger, subjectController.getDirectories);
//body mit params in controller ersetzen 
subjectRouter.get("/getdirectories", requestLogger, subjectController.getDirectories);
subjectRouter.put("/updatedirectories", requestLogger, subjectController.updateDirectories);
subjectRouter.put("/updatename", requestLogger, subjectController.updateSubjectName);
subjectRouter.delete("/delete", requestLogger, subjectController.deleteSubject);

module.exports = subjectRouter;