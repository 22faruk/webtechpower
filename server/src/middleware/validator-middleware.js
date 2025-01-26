const {body, param, validationResult} = require("express-validator");

exports.validateLogin = [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(
                "Validation Fehler: " + JSON.stringify(errors.array(), null, 2)
            );
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

exports.validateRegister = [
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
        .isLength({min: 4})
        .withMessage("Password must be at least 4 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(
                "Validation Fehler: " + JSON.stringify(errors.array(), null, 2)
            );
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];

exports.validateFlashcard = [
    param("subjectId")
        .isMongoId()
        .withMessage("subjectId muss eine gültige MongoDB-ID sein."),
    param("folderName")
        .isString()
        .withMessage("FolderName muss ein String sein.")
        .notEmpty()
        .withMessage("FolderName darf nicht leer sein."),
    body("question")
        .isString()
        .withMessage("Frage muss ein String sein.")
        .notEmpty()
        .withMessage("Frage darf nicht leer sein."),
    body("answer")
        .isString()
        .withMessage("Antwort muss ein String sein.")
        .notEmpty()
        .withMessage("Antwort darf nicht leer sein."),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(
                "Validation Fehler: " + JSON.stringify(errors.array(), null, 2)
            );
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
];
