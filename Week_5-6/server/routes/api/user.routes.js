const UserController = require("../../controllers/user.controller");
const router = require("express").Router();

// Get All Todos
router.get("/get-all-todos", UserController.getTodos);

// Create Todo
router.post("/create-todo", UserController.createTodo);

// Edit Todo
router.put("/edit-todo/:id", UserController.editTodo);

// Update Todo Status
router.put("/update-todo-status/:id", UserController.updateStatus);

// Delete Single Todo
router.delete("/delete-todo/:id", UserController.deleteTodo);

// Bulk Delete Todos
router.delete("/bulk-delete-todos", UserController.bulkDeleteTodos);

module.exports = router;
