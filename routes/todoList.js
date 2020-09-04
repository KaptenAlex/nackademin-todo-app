const express = require('express'); 
const router = new express.Router();
const todoListController = require('../controllers/todoList.js')
const authorizationController = require('../controllers/authorization.js')

router.get('/', authorizationController.authorize, todoListController.getTodoLists);
router.post('/', authorizationController.authorize, todoListController.createTodoList);
router.patch('/', authorizationController.authorize, todoListController.updateTodoList);
router.delete('/', authorizationController.authorize, todoListController.deleteTodoList);

module.exports = router;