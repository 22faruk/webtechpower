const Flashcard = require("../models/flashcard-model");
const User = require("../models/user-model");
const Subject = require("../models/subject-model");

exports.updateFlashcard = async (req, res, next) => {
    //updateFlashcard used for: 1. update question/answer, 2. update correct answer streak
    const flashcardId = req.params.flashcardId;
    const {newQuestion, newAnswer, count} = req.body;
    try {
        const updateFields = {
            question: newQuestion,
            answer: newAnswer,
        };

        if (count) {
            //optional
            updateFields.count = count;
        }

        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            flashcardId,
            updateFields,
            {
                new: true,
            }
        );
        return res.status(200).json({
            message: "Flashcard wurde aktualisiert",
            data: updatedFlashcard,
        });
    } catch (error) {
        next(error);
    }
};

exports.createCard = async (req, res, next) => {
    const {subjectId, folderName} = req.params;
    const {question, answer} = req.body;
    try {
        let subject = await Subject.findById(subjectId);
        let owner = await User.findById(subject.owner);
        if (!owner) {
            //TODO: Diese Abfrage irgendwie durch validation-middleware ausklammern??
            return res.status(404).json({error: "Owner not found"});
        }

        const newFlashcard = await new Flashcard({
            owner,
            question,
            answer,
        }).save(); //Middleware validiert Flashcard vorher
        subject = await Subject.findByIdAndUpdate(
            subjectId,
            {
                $push: {"directories.$[dir].flashcards": newFlashcard._id},
            },
            {
                arrayFilters: [{"dir.folderName": folderName}],
                new: true,
            }
        );
        let directory = subject.directories.find(
            (dir) => dir.folderName === folderName
        );
        if (!directory) {
            directory = {folderName, flashcards: []};
            subject.directories.push(directory);
        }

        return res.status(201).json({
            message: `Neue Flashcard wurde dem Subject ${subject.subjectName} hinzugefügt`,
            data: subject,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteFlashcard = async (req, res, next) => {
    const flashcardId = req.params.flashcardId;
    try {
        await Flashcard.findByIdAndDelete(flashcardId);
        await Subject.updateMany(
            {"directories.flashcards": flashcardId},
            {$pull: {"directories.$[].flashcards": flashcardId}}
        );
        return res.status(200).json({
            message: "Flashcard wurde entfernt",
        });
    } catch (error) {
        next(error);
    }
};
