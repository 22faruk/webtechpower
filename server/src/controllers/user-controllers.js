const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); //used for hashing pw

exports.registerUser = async (req, res, next) => {
  let { username, name, email } = req.body;
  let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); //salt: sequence of characters, added to string
  try {
    const newUser = await new User({ username, name, password, email }).save();
    return res.status(201).json({
      message: `User ${username} has registered successfully!`,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    } else {
      let checkPW = await bcrypt.compare(password, user.password);
      if (!checkPW) {
        return res.status(401).send({
          message: "Invalid password",
        });
      } else {
        const token = jwt.sign({ _id: user._id }, "secret"); //jwt token for authorization
        return res.status(200).json({
          message: "Login succesful",
          data: token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.userId;
  if (userId !== req.user._id) {
    return res.status(401).json({ message: `Unauthorized request` });
  }
  try {
    const user = await User.findById(userId).populate(
      "friendRequests",
      "username"
    );
    if (!user) {
      return res.status(404).json({
        message: `User with id ${userId} not found`,
      });
    } else {
      return res.status(200).json({ data: user });
    }
  } catch (error) {
    next(error);
  }
};

exports.sendFriendRequest = async (req, res, next) => {
  const userId = req.user._id;
  const receiverId = req.body.receiverId;
  if (userId == receiverId) {
    return res
      .status(400)
      .json({ message: `Cannot send friendrequest to yourself` });
  }
  try {
    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: `Receiver not found` });
    } else if (user.friendRequests.includes(receiverId)) {
      receiver.friends.push(userId);
      await receiver.save();
      user.friends.push(receiverId);
      user.friendRequests = user.friendRequests.filter(
        (_id) => _id.toString() !== receiverId
      );
      await user.save();
      return res.status(200).json({
        message: `Friendrequest already in User's list accepted`,
        data: user,
      });
    } else if (
      receiver.friendRequests.includes(userId) ||
      receiver.friends.includes(userId)
    ) {
      return res
        .status(400)
        .json({ message: `Already friends/Friendrequest already sent` });
    } else {
      receiver.friendRequests.push(userId);
      await receiver.save();
      return res.status(200).json({ message: `Friendrequest sent` });
    }
  } catch (error) {
    next(error);
  }
};

exports.acceptFriendRequest = async (req, res, next) => {
  const userId = req.user._id;
  const acceptedId = req.body.acceptedId;
  if (!acceptedId) {
    return res.status(400).json({ message: `No user ID to accept was given` });
  }
  try {
    const user = await User.findById(userId);
    const acceptedUser = await User.findById(acceptedId);
    acceptedUser.friends.push(userId);
    await acceptedUser.save();
    user.friends.push(acceptedId);
    user.friendRequests = user.friendRequests.filter(
      (_id) => _id.toString() !== acceptedId
    );
    await user.save();
    return res
      .status(200)
      .json({ message: `Friendrequest accepted`, data: user });
  } catch (error) {
    next(error);
  }
};

exports.declineFriendRequest = async (req, res, next) => {
  const userId = req.user._id;
  const declinedId = req.body.declinedId;
  if (!declinedId) {
    return res.status(400).json({ message: `No user ID to decline was given` });
  }
  try {
    const user = await User.findById(userId);
    user.friendRequests = user.friendRequests.filter(
      (_id) => _id.toString() !== declinedId
    );
    await user.save();
    return res
      .status(200)
      .json({ message: `Friendrequest declined`, data: user });
  } catch (error) {
    next(error);
  }
};

exports.removeFriend = async (req, res, next) => {
  const userId = req.user._id;
  const removedId = req.body.removedId;
  if (!removedId) {
    return res.status(400).json({ message: `No user ID to remove was given` });
  }
  try {
    const user = await User.findById(userId);
    const removedFriend = await User.findById(removedId);
    console.log(removedFriend._id);
    user.friends = user.friends.filter((_id) => _id.toString() !== removedId);
    await user.save();
    removedFriend.friends = removedFriend.friends.filter(
      (_id) => _id.toString() !== userId
    );
    await removedFriend.save();
    return res.status(200).json({ message: `Friend removed`, data: user });
  } catch (error) {
    next(error);
  }
};
