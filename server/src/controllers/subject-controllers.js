const { default: mongoose } = require("mongoose");
const Subject = require("../models/subject-model");

exports.getSubjects = async (req, res, next) => {
    const userId = req.user._id;
    //console.log(req.user._id);
    try {
        const subjects = await Subject.find({ owner: userId })
        .populate({
            path: 'directories.flashcards',
            select: 'question answer'
        });
        return res.status(200).json({
            message: `List of subjects of user ${userId}`,
            data: subjects
        });    
    } catch (error) {
        next(error);
    }
};

exports.getDirectories = async (req, res, next) => {
    const subjectId = req.params.subjectId;
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
    //console.log(req.user._id,req.body.subjectName);
    const subject = {
        owner: req.user._id,
        subjectName: req.body.subjectName,
        directories: []
    };

    try {
        const newSubject = await new Subject(subject).save();
        return res.status(201).json({
            message: `New subject ${subject.subjectName} has been created`,
            data: newSubject
        });
    } catch (error) {
        next(error);
    }
};

//ALT Kann auch genutzt werden, um (teilweise) Directories zu löschen oder Name eines Folder zu ändern
/* exports.updateDirectories = async (req, res, next) => {
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
}; */

exports.updateSubject = async (req, res, next) => {
    const subjectId = req.params.subjectId;
    const updatedName = req.body.subjectName;
    const updatedDirectories = req.body.directories;
    const invalidInput = typeof req.body.subjectName === "undefined" && typeof req.body.directories === "undefined";
    //console.log(invalid);
    try {
        if(invalidInput){
            return res.status(400).json({
                message: `Invalid input, no update variables were set`
            });

        } else if(updatedName){
            updatedSubject = await Subject.findByIdAndUpdate(subjectId, {
                subjectName: updatedName
            }, {
                new: true
            });
            return res.status(200).json({
                message: `Name of subject ${subjectId} has been updated`,
                data: updatedSubject
            });

        } else if(updatedDirectories){
            const updatedSubject = await Subject.findByIdAndUpdate(subjectId, { 
                directories: updatedDirectories   
            }, { 
                new: true 
            });
            return res.status(200).json({
                message: `Directories of subject ${subjectId} have been updated`,
                data: updatedSubject
            });
        }

    } catch (error) {
        next(error);
    }
};

exports.deleteSubject = async (req, res, next) => {
    const subjectId = req.params.subjectId;
    try {
        await Subject.findByIdAndDelete(subjectId);
        return res.status(200).json({
            message: `Subject ${subjectId} has been deleted`
        });
    } catch (error) {
        next(error);
    }
};
