const express = require("express");
const quizController = require("../controllers/quiz-controllers");
const requestLogger = require("../middleware/logger-middleware");
const validator = require("../middleware/validator-middleware")
const authenticateToken = require("../middleware/jwt-authentication-middleware");

const quizRouter = express.Router();
quizRouter.post("/:subjectId/:directoryId?", requestLogger, authenticateToken, quizController.createQuiz);
quizRouter.get("/", requestLogger, authenticateToken, quizController.nextQuestion);
quizRouter.get("/numRemainingQuestions", requestLogger, authenticateToken, quizController.numRemainingQuestions);
quizRouter.patch("/validate/:questionId", requestLogger, authenticateToken, quizController.validateQuestion);

module.exports = quizRouter;