const express = require("express");
const userController = require("../controllers/user-controllers");
const authenticateToken = require("../middleware/jwt-authentication-middleware");
const validator = require("../middleware/validator-middleware");

const userRouter = express.Router();

userRouter.post("/", validator.validateRegister, userController.registerUser);

userRouter.post("/session", validator.validateLogin, userController.loginUser);

userRouter.get("/test", authenticateToken, userController.testMethod);

module.exports = userRouter;