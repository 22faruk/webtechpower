const express = require("express");
const quizController = require("../controllers/quiz-controllers");
const requestLogger = require("../middleware/logger-middleware");
const validator = require("../middleware/validator-middleware")
const authenticateToken = require("../middleware/jwt-authentication-middleware");

const quizRouter = express.Router();
quizRouter.post("/:subjectId/:directoryId?", requestLogger, quizController.createQuiz);
quizRouter.get("/", requestLogger, quizController.nextQuestion);
quizRouter.get("/numRemainingQuestions", requestLogger, quizController.numRemainingQuestions);
quizRouter.get("/validate/:questionId", requestLogger, quizController.validateQuestion);

module.exports = quizRouter;