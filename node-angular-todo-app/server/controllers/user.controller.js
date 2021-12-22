const Todo = require("../models/Todo");

class UserController {
    // Add Todo
    static createTodo = (req, res) => {
        try {
            const { task } = req.body;
            Todo.create({
                userId: req.user.id,
                task,
                isDone: false,
            })
                .then((todo) => {
                    res.status(201).json({
                        todo,
                        message: "Todo is created successfully",
                        statusCode: 201,
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };

    // Get Todos
    static getTodos = (req, res) => {
        try {
            Todo.findAll({ where: { userId: req.user.id } })
                .then((todos) => {
                    res.status(200).json({ todos });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };

    // Get Single Todo
    static getTodo = (req, res) => {
        try {
            const { id } = req.params;
            Todo.findOne({ where: { id, userId: req.user.id } })
                .then((todo) => {
                    res.status(200).json({ todo });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };

    // Edit Todo
    static editTodo = (req, res) => {
        try {
            const { id } = req.params;
            const { task } = req.body;
            Todo.update({ task }, { where: { id, userId: req.user.id } })
                .then((response) => {
                    res.status(200).json({
                        message: "Todo is updated successfully",
                        statusCode: 200,
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };

    // Update Status
    static updateTodoStatus = (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            Todo.update(
                { isDone: status },
                { where: { id, userId: req.user.id } }
            )
                .then((response) => {
                    res.status(200).json({
                        message: "Todo status is updated successfully",
                        statusCode: 200,
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };

    // Delete Todo
    static deleteTodo = (req, res) => {
        try {
            const { id } = req.params;
            Todo.destroy({ where: { id, userId: req.user.id } })
                .then((response) => {
                    res.status(200).json({
                        message: "Todo is deleted successfully",
                        statusCode: 200,
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };

    // Bulk Delete Todo
    static bulkDeleteTodos = (req, res) => {
        try {
            const { ids } = req.body;
            Todo.destroy({ where: { id: ids, userId: req.user.id } })
                .then((response) => {
                    res.status(200).json({
                        message: "Todos are deleted successfully",
                        statusCode: 200,
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Error occured!",
                        error: err.message,
                        statusCode: 400,
                    });
                });
        } catch (error) {
            res.status(400).json({
                message: "Error occured!",
                error: error.message,
                statusCode: 400,
            });
        }
    };
}

module.exports = UserController;
