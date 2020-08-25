const express = require('express'); 
const todoController = require('../controllers/todos.js')
const router = new express.Router();

router.get('/', todoController.loadIndex);

router.get('/loadLatestCreated', todoController.loadLatestCreated);

router.get('/loadLatestUpdated', todoController.loadLatestUpdated);

router.get('/loadAllTodoItems/', todoController.loadAllTodoItems);

router.post('/createTodoItem', todoController.createTodoItem);

router.put('/updateTodoItem/:id', todoController.updateTodoItem);

router.delete('/deleteTodoItem/:id', todoController.deleteTodoItem);

module.exports = router;