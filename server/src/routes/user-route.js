const express = require("express");
const userController = require("../controllers/user-controllers");
const authenticateToken = require("../middleware/jwt-authentication-middleware");
const { validateLogin, validateRegister } = require("../middleware/validator-middleware");

const userRouter = express.Router();

userRouter.post("/register", validateRegister, userController.registerUser);

userRouter.post("/login", validateLogin, userController.loginUser);

userRouter.get("/test", authenticateToken, userController.testMethod);

module.exports = userRouter;