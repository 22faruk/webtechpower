const express = require("express");
const userController = require("../controllers/user-controllers");
const authenticateToken = require("../middleware/user-middleware");

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);

userRouter.get("/login/:username", userController.loginUser);

userRouter.get("/test", authenticateToken, userController.testMethod);

module.exports = userRouter;