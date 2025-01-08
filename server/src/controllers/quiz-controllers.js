const Quiz = require("../models/quiz-model");
const Subject = require("../models/subject-model");
const User = require("../models/user-model")

//generates a random integer between [from,to)
function randomNumber(from, to)
{
    return Math.trunc(Math.random() * (to - from) + from)
}

/*
    Hinweise:
        - Jeder User kann nur ein offenes Quiz haben
                - Erstellt ein User ein neues Quiz, obwohl er bereits eines offen hat, wird dieses einfach überschrieben
        - Methode createQuiz:
            - Ist im param nur die subject ID vorhanden, dann wird ein Quiz erstellt, mit allen Karten (aus allen Directories, in diesem Subject)
            - Wird nach der subject ID zusätzlich eine directory ID übergeben(optional), enthält das Quiz nur die Karten aus dieser Directory
        - Methode nextQuestion:
            - Gibt aus dem offenen Quiz, eines Users, eine zufällige Karte zurück (diese wird anschliessend aus dem Quiz vollständig entfernt)
            - Es muss nichts übergeben werden (user ID wird automatisch aus der req gezogen; Alternativ kann die user ID im Body, in einem Object "user" unter der property "_id" übergeben werden)
        - Methode numRemainingQuestions:
            - Gibt zurück, wie viele Fragen noch übrig sind
            - Es muss nichts übergeben werden
*/

exports.createQuiz = async(req, res, next) => {
    try {
        const {subjectId, directoryId} = req.params;
        //const userId = req.user._id;

        const subject = await Subject.findById(subjectId);
        if(!subject) throw new Error(`No subject exists with id: ${subjectId}!`);

        if(!subject.owner) throw new Error(`Subject with id: ${subjectId} has no owner!`);
        const userId = subject.owner._id;

        const user = await User.findById(userId);
        if(!user) throw new Error(`No user exists with id: ${userId}!`);

        let flashcards = [];
        if(!directoryId) {
            for(const directory of subject.directories)
            {
                flashcards = flashcards.concat(directory.flashcards);
            }
        }
        else {
            const directory = subject.directories.find((dir,_) => dir._id == directoryId);
            if(!directory) throw new Error(`No directory exists with id: ${directoryId}!`);
            flashcards = directory.flashcards;
        }

        const quiz = await Quiz.findOneAndUpdate({owner:userId},{flashcards:flashcards},{new:true, upsert:true}).populate({path: 'flashcards', select: 'question answer'});

        return res.status(200).json({
            message: "Successfully created Quiz",
            data: quiz
        });
    }

    catch(err) {
        next(err);
    }
}

exports.nextQuestion = async(req,res,next) => {
    try {
        const userId = (req.user ? req.user._id : (req.body.user ? req.body.user._id : undefined));
        if(!userId) throw new Error("No user id provided!");

        if(!await User.findById(userId)) throw new Error(`No user exists with id: ${userId}`);
    
        const quiz = await Quiz.findOne({owner: userId}).populate({path: 'flashcards', select: 'question answer'});
        if(!quiz) throw new Error(`User with id: ${userId} has no quiz!`);
        
        flashcards = quiz.flashcards.slice();
        const num_answers=4;
        const questionAnswers={question:"", answers:[]};

        for(let i=0;i<num_answers && flashcards.length>0;++i)
        {
            const randomIndex = randomNumber(0,flashcards.length);
            flashcard = flashcards[randomIndex];
            flashcards.splice(randomIndex,1);

            if(0==i)
            {
                quiz.flashcards.splice(randomIndex,1);
                questionAnswers.question=flashcard.question;
            }

            questionAnswers.answers.push(flashcard.answer);
        }

        await quiz.save();
    
        return res.status(200).json({
            message: `Successfully fetched next question!`,
            data: questionAnswers
        });
    }
    
    catch(err) {
        next(err);
    }
}

exports.numRemainingQuestions = async(req,res,next) => {
    try {
        const userId = (req.user ? req.user._id : (req.body.user ? req.body.user._id : undefined));
        if(!userId) throw new Error("No user id provided!");

        if(!await User.findById(userId)) throw new Error(`No user exists with id: ${userId}!`);

        const quiz = await Quiz.findOne({owner: userId});
        if(!quiz) throw new Error(`user with id: ${userId} has no quiz!`);

        return res.status(200).json({
            data: quiz.flashcards.length
        })
    }

    catch(err) {
        next(err);
    }
}