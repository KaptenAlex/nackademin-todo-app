const express = require('express'); 
const router = express.Router();
const usersController = require('../controllers/users.js')
const authorizationController = require('../controllers/authorization.js')

// Admin routers
router.get("/getAllUsers", authorizationController.authorize, usersController.getAllUsers)
router.post("/createUser", authorizationController.authorize, usersController.createUserAccount);
router.delete('/removeUser', authorizationController.authorize, usersController.removeUserAccount);

// Users routers

// Admin/Users routers


// If the user has the role admin, check all todos items the user has
// If the user has the role user, check only their own todo items
// router.get('/:userId/todos', authorizationController.authorize, userController.getUserTodoItems);

// Anonymous routers
router.post("/signinUser", authorizationController.login);
router.get("/authorizeUser", authorizationController.authorize, usersController.userIsAuthorized);

module.exports = router;