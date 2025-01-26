const Todo = require("../models/todo-model");

exports.createTodo = async (req, res, next) => {
    const title = req.body.title;
    try {
        const newTodo = await new Todo({title}).save();
        return res.status(201).json({
            message: `New todo created!`,
            data: newTodo,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllTodos = async (_, res, next) => {
    try {
        const foundTodos = await Todo.find({});
        return res.status(200).json({
            message: `Found all todos`,
            data: foundTodos,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTodo = async (req, res, next) => {
    const todoId = req.params.todoId;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            const error = new Error(`Todo not found with id: ${todoId}`);
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            message: `Todo with successfully deleted.`,
            data: deletedTodo,
        });
    } catch (error) {
        next(error);
    }
};
