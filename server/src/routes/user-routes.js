const express = require("express");
const userController = require("../controllers/user-controllers");
const authenticateToken = require("../middleware/jwt-authentication-middleware");
const validator = require("../middleware/validator-middleware");

const userRouter = express.Router();

userRouter.post("/", validator.validateRegister, userController.registerUser);

userRouter.post("/session", validator.validateLogin, userController.loginUser);

userRouter.get("/test", authenticateToken, userController.testMethod);

userRouter.get("/:userId", authenticateToken, userController.getUser);

userRouter.patch("/friendRequest", authenticateToken, userController.sendFriendRequest);

userRouter.patch("/accept", authenticateToken, userController.acceptFriendRequest);

userRouter.patch("/decline", authenticateToken, userController.declineFriendRequest);

module.exports = userRouter;