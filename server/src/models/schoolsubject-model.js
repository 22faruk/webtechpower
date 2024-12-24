const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolSubjectSchema = new Schema({
    subjectName: {type: String, required: true},
    directories: [
        {
            folderName: {type: String, required: false},
            flashcards: [{type: ObjectId, ref: "Flashcard"}]
        }
    ]
})

module.exports = mongoose.model("schoolSubject", flashcardSchema);