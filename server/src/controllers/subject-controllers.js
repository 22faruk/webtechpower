const Subject = require("../models/subject-model");

//TODO: subjectName überprüfen ob unique. Ein User darf nicht zwei Subjects mit dem gleichem Namen haben.
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

//Ein User kann nicht zwei Subjects mit dem gleichem Namen haben, da diese genutzt werden,
//um nach dem Subjects eines Users zu filtern, dessen Directories geupdated werden sollen.
exports.updateSubjectContent = async (req, res, next) => {
    const updateSubject = req.body;
    const filter = { owner: updateSubject.owner, subjectName: updateSubject.subjectName };
    try {
        //let, const. Warum gibt findOneAndUpdate den alten Wert zurück??
        const updatedSubjectContent = await Subject.findOneAndUpdate(filter, updateSubject);
        return res.status(200).json({
            message: `Subject updated!`,
            //data ist der alte Wert, warum?
            data: updatedSubjectContent
        });
    } catch (error) {
        next(error);
    }
};
//Das Subject (model) speichert nur die ID des Owners, würde vllt mehr Sinn machen den Username auch zu speichern.
exports.updateSubjectName = async (req, res, next) => {
    const user = req.body.owner;
    const oldName = req.body.oldName;
    const newName = req.body.newName;

    const update = { subjectName: newName };
    const filter = { owner: user, subjectName: oldName };
    try {
        //let, const. Warum gibt findOneAndUpdate den alten Wert zurück??
        let updatedSubjectName = await Subject.findOneAndUpdate(filter, update);
        return res.status(200).json({
            message: `Subject name updated!`,
            //data ist der alte Wert, warum?
            data: updatedSubjectName
        });
    } catch (error) {
        next(error);
    }
};
