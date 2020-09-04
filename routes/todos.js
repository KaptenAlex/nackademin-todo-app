const express = require('express'); 
const router = new express.Router();
const todoController = require('../controllers/todos.js')
const authorizationController = require('../controllers/authorization.js')


// Admin routes

// User routes

// Admin/User routes
router.get('/todos/', authorizationController.authorize, todoController.loadAllTodoItems);
router.get('/sort/created', authorizationController.authorize, todoController.loadLatestCreated);
router.get('/sort/updated', authorizationController.authorize, todoController.loadLatestUpdated);
router.post('/', authorizationController.authorize, todoController.createTodoItem);
router.put('/:id', authorizationController.authorize, todoController.updateTodoItem);
router.delete('/:id', authorizationController.authorize, todoController.deleteTodoItem);

router.get('/countTodoItems', authorizationController.authorize, todoController.countTodoItemsPages);

// Anonymous routes
router.get('/', todoController.loadIndex);

module.exports = router;