const User = require("../models/user-model");
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res, next) => {
    const username = req.body.username;
    const name = req.body.name;
    try {
        const newUser = await new User({username, name}).save();
        return res.status(201).json({
            message: `User ${username} has registered successfully!`,
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const username = req.params.username;
    const user = await User.findOne({username})

    try {
        if(!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }

        const token = jwt.sign({_id: user._id}, "secret")

        return res.status(200).json({
            message: 'Login succesful',
            token,
        })
    } catch (error)
    {
        next(error)
    }
}

exports.testMethod = async (req, res, next) => {
    try {
        return res.status(200).json({
            message: 'Test erfolgreich'
        })
    }
    catch (error)
    {
        next(error)
    }
}

