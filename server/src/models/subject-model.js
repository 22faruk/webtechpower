const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  subjectName: { type: String, required: true },
  directories: [
    {
      folderName: { type: String, required: false },
      flashcards: [{ type: Schema.Types.ObjectId, ref: "Flashcard" }],
    },
  ],
});

module.exports = mongoose.model("subject", subjectSchema);
