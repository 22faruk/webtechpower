const express = require("express");
const quizController = require("../controllers/quiz-controllers");
const requestLogger = require("../middleware/logger-middleware");
const authenticateToken = require("../middleware/jwt-authentication-middleware");

const quizRouter = express.Router();
quizRouter.use([requestLogger/*,authenticateToken*/]);
quizRouter.post(
  "/:subjectId/:directoryId?",
  quizController.createQuiz
);
quizRouter.get(
  "/",
  quizController.nextQuestion
);
quizRouter.get(
  "/numRemainingQuestions",
  quizController.numRemainingQuestions
);
quizRouter.patch(
  "/validate/:questionId",
  quizController.validateQuestion
);

module.exports = quizRouter;
