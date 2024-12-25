const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {type: String, required: true},
    answer: {type: String, required: true},
})

module.exports = mongoose.model("Flashcard", flashcardSchema);