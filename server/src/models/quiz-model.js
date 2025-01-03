const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    flashcards: [{type: Schema.Types.ObjectId, ref: "Flashcard"}]
})

module.exports = mongoose.model("Quiz", quizSchema);