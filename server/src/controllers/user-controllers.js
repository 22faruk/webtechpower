const User = require("../models/user-model");
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.registerUser = async (req, res, next) => {
    let {username, name, email} = req.body;
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    try {
        const newUser = await new User({username, name, password, email}).save();
        return res.status(201).json({
            message: `User ${username} has registered successfully!`,
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    try {
        if(!user) {
            return res.status(404).send({
                message: 'User not found'
            });
        }
        else {
            let checkPW = bcrypt.compare(password, user.password);
            if(!checkPW)
            {
                return res.status(401).send({
                    message: 'Invalid password'
                })
            }
            else
            {
                const token = jwt.sign({_id: user._id}, "secret")

                return res.status(200).json({
                    message: 'Login succesful',
                    data: token
                })
            }
        }
    } catch (error)
    {
        next(error)
    }
}

exports.testMethod = async (req, res, next) => {
    try {
        console.log(req.user._id);
        return res.status(200).json({
            message: 'Test erfolgreich'
        })
    }
    catch (error)
    {
        next(error)
    }
}

