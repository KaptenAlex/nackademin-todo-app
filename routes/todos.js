const express = require('express'); 
const router = new express.Router();
const todoController = require('../controllers/todos.js')
const authorizationController = require('../controllers/authorization.js')


// Admin routes

// User routes

// Admin/User routes
router.get('/loadLatestCreated', authorizationController.authorize, todoController.loadLatestCreated);
router.get('/loadLatestUpdated', authorizationController.authorize, todoController.loadLatestUpdated);
router.get('/loadAllTodoItems', authorizationController.authorize, todoController.loadAllTodoItems);
router.get('/countTodoItems', authorizationController.authorize, todoController.countTodoItems);
router.post('/createTodoItem', authorizationController.authorize, todoController.createTodoItem);
router.put('/updateTodoItem/:id', authorizationController.authorize, todoController.updateTodoItem);
router.delete('/deleteTodoItem/:id', authorizationController.authorize, todoController.deleteTodoItem);

// Anonymous routes
router.get('/', todoController.loadIndex);

module.exports = router;