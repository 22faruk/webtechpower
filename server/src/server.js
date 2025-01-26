const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const todoRouter = require("./routes/todo-routes");
const userRouter = require("./routes/user-routes");
const subjectRouter = require("./routes/subject-routes");
const flashcardRouter = require("./routes/flashcard-routes");
const quizRouter = require("./routes/quiz-routes");
const errorHandler = require("./middleware/error-handler-middleware");
const connectDB = require("./database/connectDB");

dotenv.config();
PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  console.log("NODE_ENV", process.env.NODE_ENV);
  app.use(
    cors({
      origin: ["http://localhost:4200", "http://localhost:5173,", "https://webtechtestdeploy-1.onrender.com"],
    })
  );
}

app.use("/todos", todoRouter);

app.use("/users", userRouter);

app.use("/flashcard", flashcardRouter);

app.use("/subjects", subjectRouter);

app.use("/quiz", quizRouter);

app.use(errorHandler);

app.use(express.static("../angular-client/dist/mean-lecture/browser"));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      "../../angular-client/dist/mean-lecture/browser/index.html"
    )
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
