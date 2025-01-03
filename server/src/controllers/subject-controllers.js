const { default: mongoose } = require("mongoose");
const Subject = require("../models/subject-model");

exports.getSubjects = async (req, res, next) => {
    const userId = req.user._id
    try {
        const subjects = await Subject.find({ owner: userId });
        return res.status(200).json({
            message: `List of subjects of user ${userId}`,
            data: subjects
        });    
    } catch (error) {
        next(error);
    }
};

exports.getDirectories = async (req, res, next) => {
    const subjectId = req.body.subjectId;
    try {
        const subject = await Subject.findById(subjectId);
        return res.status(200).json({
            message: `Subject ${subjectId}`,
            data: subject.directories
        });
    } catch (error) {
        next(error);
    }
};

exports.createSubject = async (req, res, next) => {
    const {owner, subjectName, directories} = req.body;
    try {
        const newSubject = await new Subject({ owner, subjectName, directories }).save();
        return res.status(201).json({
            message: `New subject ${subjectName} has been created`,
            data: newSubject
        });
    } catch (error) {
        next(error);
    }
};

//Kann auch genutzt werden, um (teilweise) Directories zu löschen oder Name eines Folder zu ändern
exports.updateDirectories = async (req, res, next) => {
    const subjectId = req.body.subjectId;
    const updatedDirectories = req.body.directories;
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(subjectId, { 
            $set: { directories: updatedDirectories }  
        }, { 
            new: true 
        });
        return res.status(200).json({
            message: `Directories of subject ${subjectId} have been updated`,
            data: updatedSubject
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSubjectName = async (req, res, next) => {
    const subjectId = req.body.subjectId;
    const updatedName = req.body.subjectName;
    try {
        updatedSubject = await Subject.findByIdAndUpdate(subjectId, {
            $set: { subjectName: updatedName }
        }, {
            new: true
        });
        return res.status(200).json({
            message: `Name of subject ${subjectId} has been updated`,
            data: updatedSubject
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSubject = async (req, res, next) => {
    const subjectId = req.body.subjectId;
    try {
        await Subject.findByIdAndDelete(subjectId);
        return res.status(200).json({
            message: `Subject ${subjectId} has been deleted`
        });
    } catch (error) {
        next(error);
    }
};
