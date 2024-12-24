const Subject = require("../models/subject-model");

exports.createSubject = async (req, res, next) => {
    let {owner, subjectName, directories} = req.body;
    try {
        const newSubject = await new Subject({ owner, subjectName, directories }).save();
        return res.status(201).json({
            message: `New subject ${subjectName} has been created!`,
            data: newSubject
        });
    } catch (error) {
        next(error);
    }
};