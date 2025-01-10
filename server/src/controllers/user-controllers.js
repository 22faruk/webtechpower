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
    const user = await User.findOne({username});
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
                });
            }
            else
            {
                const token = jwt.sign({_id: user._id}, "secret");

                return res.status(200).json({
                    message: 'Login succesful',
                    data: token
                });
            }
        }
    } catch (error)
    {
        next(error);
    }
};

exports.testMethod = async (req, res, next) => {
    try {
        console.log(req.user._id);
        return res.status(200).json({
            message: 'Test erfolgreich'
        });
    }
    catch (error)
    {
        next(error);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).populate("friendRequests", "username");
        return res.status(200).json({ message: `here`, data: user });
    } catch (error) {
        next(error);
    }
};

exports.sendFriendRequest = async (req, res, next) => {
    const userId = req.user._id;
    const receiverId = req.body.receiverId;
    try {
        const user = await User.findById(userId);
        const receiver = await User.findById(receiverId);
        receiver.friendRequests.push(userId);
        await receiver.save();
        return res.status(200).json({ message: `Added` });
    } catch (error) {
        next(error);
    }
};

exports.acceptFriendRequest = async (req, res, next) => {
    const userId = req.user._id;
    const acceptedId = req.body.acceptedId;
    try {
        const user = await User.findById(userId);
        user.friends.push(acceptedId);
        user.friendRequests = user.friendRequests.filter(_id => _id.toString() !== acceptedId);
        await user.save();
        return res.status(200).json({ message: `ok` });
    } catch (error) {
        next(error);
    }
};

exports.declineFriendRequest = async(req, res, next) => {
    const userId = req.user._id;
    const declinedId = req.body.declinedId;
    try {
        const user = await User.findById(userId);
        user.friendRequests = user.friendRequests.filter(_id => _id.toString() !== declinedId);
        await user.save();
        return res.status(200).json({ message: `ok` });
    } catch (error) {
        next(error);
    }
};