const express = require('express'); 
const router = new express.Router();
const todoController = require('../controllers/todos.js')
const authorizationController = require('../controllers/authorization.js')


// Admin routes

// User routes

// Admin/User routes
router.get('/loadLatestCreated', todoController.loadLatestCreated);
router.get('/loadLatestUpdated', todoController.loadLatestUpdated);
router.get('/loadAllTodoItems/', todoController.loadAllTodoItems);
router.get('/countTodoItems', todoController.countTodoItems);
router.post('/createTodoItem', todoController.createTodoItem);
router.put('/updateTodoItem/:id', todoController.updateTodoItem);
router.delete('/deleteTodoItem/:id', todoController.deleteTodoItem);

// Anonymous routes
router.get('/', todoController.loadIndex);

module.exports = router;