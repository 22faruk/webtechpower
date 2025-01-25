const Quiz = require("../models/quiz-model");
const Subject = require("../models/subject-model");
const User = require("../models/user-model");
const Flashcard = require("../models/flashcard-model");

//generates a random integer between [from,to)
function randomNumber(from, to) {
  return Math.trunc(Math.random() * (to - from) + from);
}

async function fetchEntry(schema, id, requiredProperties = []) {
  const entry = await schema.findById(id);

  if (!entry) {
    const err = new Error(`${schema.modelName} has no id: ${id}`);
    err.status = 404;
    throw err;
  }

  for (const property of requiredProperties) {
    if (!entry[property]) {
      throw new Error(
        `${schema.modelName} with id: ${id} has no property ${property}`
      );
    }
  }

  return entry;
}

exports.createQuiz = async (req, res, next) => {
  try {
    const { subjectId, directoryId } = req.params;
    const subject = await fetchEntry(Subject, subjectId, ["owner"]);
    const userId = subject.owner._id;
    if (!User.findById(userId)) {
      throw new Error(`User with id: ${userId} not found!`);
    }

    let flashcards = [];

    if (!directoryId) {
      for (const directory of subject.directories) {
        flashcards = flashcards.concat(directory.flashcards);
      }
    } else {
      const directory = subject.directories.find(
        (dir, _) => dir._id == directoryId
      );
      if (!directory) {
        throw new Error(`No directory exists with id: ${directoryId}!`);
      }

      flashcards = directory.flashcards;
    }

    const quiz = await Quiz.findOneAndUpdate(
      { owner: userId },
      { flashcards: flashcards, numRemainingFlashcards: flashcards.length },
      { new: true, upsert: true }
    ).populate({ path: "flashcards", select: "question answer" });

    return res.status(200).json({
      message: "Successfully created Quiz",
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

exports.nextQuestion = async (req, res, next) => {
  try {
    const userId = req.user
      ? req.user._id
      : (req.body.user
      ? req.body.user._id
      : undefined);
    if (!userId) throw new Error("No user id provided!");

    //const userId = req.user._id;
    if (!(await User.findById(userId))) {
      throw new Error(`No user exists with id: ${userId}`);
    }

    const quiz = await Quiz.findOne({ owner: userId }).populate({
      path: "flashcards",
      select: "question answer",
    });
    if (!quiz) {
      throw new Error(`User with id: ${userId} has no quiz!`);
    }

    if (0 == quiz.numRemainingFlashcards) {
      throw new Error(`No more questions available!`);
    }

    const flashcards = quiz.flashcards;
    const numAnswers = 4;
    const questionAnswers = { question: "", questionId: null, answers: [] };

    for (let i = 0; i < numAnswers; ++i) {
      //pushes correct answer into the first entry of the answers array
      if (0 == i) {
        const randomIndex = randomNumber(0, quiz.numRemainingFlashcards);
        const flashcard = flashcards[randomIndex];

        //swaps the randomly choosen flashcard with the last flashcard in the array (so remaining flashcards will always be in the range [0,numRemainingFlashcards))
        const tmp = flashcards[quiz.numRemainingFlashcards - 1];
        flashcards[randomIndex] = tmp;
        flashcards[quiz.numRemainingFlashcards - 1] = flashcard;
        --quiz.numRemainingFlashcards;

        questionAnswers.question = flashcard.question;
        questionAnswers.questionId = flashcard._id;
        questionAnswers.answers.push(flashcard.answer);
      } else {
        const randomIndex = randomNumber(0, flashcards.length);
        const flashcard = flashcards[randomIndex];

        questionAnswers.answers.push(flashcard.answer);
      }
    }

    await quiz.save();

    return res.status(200).json({
      message: `Successfully fetched next question!`,
      data: questionAnswers,
    });
  } catch (err) {
    next(err);
  }
};

exports.numRemainingQuestions = async (req, res, next) => {
  try {
    const userId = req.user
      ? req.user._id
      : (req.body.user
      ? req.body.user._id
      : undefined);
    if (!userId) throw new Error("No user id provided!");

    //const userId = req.user._id;
    if (!(await User.findById(userId))) {
      throw new Error(`No user exists with id: ${userId}!`);
    }

    const quiz = await Quiz.findOne({ owner: userId });
    if (!quiz) {
      throw new Error(`user with id: ${userId} has no quiz!`);
    }

    return res.status(200).json({
      data: quiz.numRemainingFlashcards,
    });
  } catch (err) {
    next(err);
  }
};

exports.validateQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.questionId;
    const flashcard = await Flashcard.findById(questionId);
    if (!flashcard) {
      throw new Error(`Question with id: ${questionId} not found!`);
    }

    const answer = req.body.answer;
    if (!answer) {
      throw new Error("No answer provided!");
    }

    const isCorrect = answer == flashcard.answer;
    flashcard.count = isCorrect ? flashcard.count + 1 : 0;
    flashcard.save();

    return res.status(200).json({
      data: { isCorrect: isCorrect },
    });
  } catch (err) {
    next(err);
  }
};
