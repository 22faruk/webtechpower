const express = require("express");
const flashcardController = require("../controllers/flashcard-controllers");
const requestLogger = require("../middleware/logger-middleware");
const validator = require("../middleware/validator-middleware");

const flashcardRouter = express.Router();
//TODO: Create muss noch überarbeitet werden!
flashcardRouter.post(
  "/:subjectId/:folderName",
  requestLogger,
  validator.validateFlashcard,
  flashcardController.createCard
);

flashcardRouter.patch(
  "/:flashcardId",
  requestLogger,
  flashcardController.updateFlashcard
);

flashcardRouter.delete("/:flashcardId", flashcardController.deleteFlashcard);

module.exports = flashcardRouter;
