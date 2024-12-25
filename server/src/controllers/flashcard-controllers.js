const Flashcard = require("../models/flashcard-model");
const User = require("../models/user-model");
const Subject = require("../models/subject-model");

/*
TODO: 1. getAllSubjects (Rückgabe: [subjectnames]), 2. getAllDirectories ([
 */
exports.updateFlashcard = async(req, res, next) => {
    const {flashcardId, newQuestion, newAnswer} = req.body;
    try {
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            flashcardId,
            {
                question: newQuestion,
                answer: newAnswer
            },
            {
                new: true
            }
            )
        return res.status(200).json({
            message: "Flashcard wurde aktualisiert",
            data: updatedFlashcard
        })
    } catch (error) {
        next(error);
    }

}

exports.createCard = async(req, res, next) => {
    let {subjectId, ownerId, question, answer, folderName  } = req.body;
    let owner = await User.findById(ownerId)
    //console.log(owner.username);
    try {
        const newFlashcard = await new Flashcard({owner, question, answer}).save(); //Middleware validiert Flashcard vorher
        /*console.log("subjectid = " + subjectId)
        console.log("flaschcardid =" + newFlashcard._id)*/

        const subject = await Subject.findByIdAndUpdate(
            subjectId,
            {
                $push: {"directories.$[dir].flashcards": newFlashcard._id}
            },
            {
                arrayFilters: [{"dir.folderName": folderName}],
                new: true
            }
        )
        /*console.log("vorhandene directories:", existingSubject.directories)
        console.log("So soll es sein:" + existingSubject.directories[0].folderName)
        console.log("So soll es sein:" + existingSubject.directories[0]._id);
        console.log(subject.subjectName)*/

        let directory = subject.directories.find(dir => dir.folderName === folderName);
        //console.log(directory.folderName)
        if (!directory) {
            directory = { folderName, flashcards: [] };
            subject.directories.push(directory);
        }

        return res.status(201).json({
            message: `Neue Flashcard wurde dem Subject ${subject.subjectName}`,
            data: subject
        })
    } catch (error) {
        next(error)
    }
}

/*exports.findFlashcardsOfUser = async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);

    }

}*/

