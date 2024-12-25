const express = require("express");
const flashcardController = require("../controllers/flashcard-controllers");
const requestLogger = require("../middleware/logger-middleware");
const validator = require("../middleware/validator-middleware")

const flashcardRouter = express.Router();
//TODO: Create muss noch überarbeitet werden!
flashcardRouter.post("/create", requestLogger, validator.validateFlashcard, flashcardController.createCard);

flashcardRouter.post("/update", requestLogger, flashcardController.updateFlashcard)

module.exports = flashcardRouter;