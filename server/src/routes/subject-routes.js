const express = require("express");
const subjectController = require("../controllers/subject-controllers");
const authenticateToken = require("../middleware/jwt-authentication-middleware");

const subjectRouter = express.Router();

subjectRouter.use(authenticateToken);

subjectRouter.post("/", subjectController.createSubject);

subjectRouter.get("/", subjectController.getSubjects);

subjectRouter.get("/:subjectId", subjectController.getDirectories);

subjectRouter.patch(
  "/:subjectId/directories",
  subjectController.updateDirectories
);

subjectRouter.patch("/:subjectId", subjectController.updateSubject);

subjectRouter.delete("/:subjectId", subjectController.deleteSubject);

module.exports = subjectRouter;
