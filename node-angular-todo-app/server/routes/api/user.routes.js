const UserController = require("../../controllers/user.controller");
const ValidationMiddleware = require("../../middleware/validation.middleware");
const router = require("express").Router();

// Get All Todos
router.get("/get-all-todos", UserController.getTodos);

// Get Single Todo
router.get("/get-single-todo/:id", UserController.getTodo);

// Create Todo
router.post(
    "/create-todo",
    ValidationMiddleware.createTodo(),
    ValidationMiddleware.validate,
    UserController.createTodo
);

// Edit Todo
router.put(
    "/edit-todo/:id",
    ValidationMiddleware.editTodo(),
    ValidationMiddleware.validate,
    UserController.editTodo
);

// Update Todo Status
router.put("/update-todo-status/:id", UserController.updateTodoStatus);

// Delete Single Todo
router.delete("/delete-todo/:id", UserController.deleteTodo);

// Bulk Delete Todos
router.delete("/bulk-delete-todos", UserController.bulkDeleteTodos);

module.exports = router;
