const express = require("express");
const userController = require("../controllers/user-controllers");

const userRouter = express.Router();

userRouter.post("/register", userController.registerUser);

userRouter.get("/login/:username", userController.loginUser);

module.exports = userRouter;