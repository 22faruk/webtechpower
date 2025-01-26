const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    flashcards: [
        {
            type: Schema.Types.ObjectId,
            ref: "Flashcard",
        },
    ],

    numRemainingFlashcards: {
        type: Number,
    },
});

module.exports = mongoose.model("Quiz", quizSchema);
