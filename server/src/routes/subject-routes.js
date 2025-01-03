const express = require("express");
const subjectController = require("../controllers/subject-controllers");
const requestLogger = require("../middleware/logger-middleware");
const authenticateToken = require("../middleware/jwt-authentication-middleware");

const subjectRouter = express.Router();

subjectRouter.post("/", authenticateToken, subjectController.createSubject);

subjectRouter.get("/", authenticateToken, subjectController.getSubjects);

subjectRouter.get("/:subjectId", authenticateToken, subjectController.getDirectories);

//subjectRouter.patch("/:subjectId/directories", authenticateToken, subjectController.updateDirectories);

subjectRouter.patch("/:subjectId", authenticateToken, subjectController.updateSubject);

subjectRouter.delete("/:subjectId", authenticateToken, subjectController.deleteSubject);

module.exports = subjectRouter;