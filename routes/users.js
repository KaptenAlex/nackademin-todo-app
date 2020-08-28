const express = require('express'); 
const router = express.Router();
const usersController = require('../controllers/users.js')
const authorizationController = require('../controllers/authorization.js')

// Admin routers
router.get("/getAllUsers", authorizationController.authorize, usersController.getAllUsers)

// Users routers

// Admin/Users routers

// router.delete('/:userId', authorizationController.authorize, userController.remove);
// router.patch('/:userId', authorizationController.authorize, userController.update);

// If the user has the role admin, check all todos items the user has
// If the user has the role user, check only their own todo items
// router.get('/:userId/todos', authorizationController.authorize, userController.getUserTodoItems);

// Anonymous routers
router.post("/createUser", usersController.createUserAccount);
router.post("/signinUser", authorizationController.login);
router.get("/authorizeUser", authorizationController.authorize, usersController.userIsAuthorized);

module.exports = router;