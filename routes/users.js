const express = require('express'); 
const router = express.Router();
const usersController = require('../controllers/users.js')
const authorizationController = require('../controllers/authorization.js')

// Admin routers
router.get("/", authorizationController.authorize, usersController.getAllUsers)
router.post("/", authorizationController.authorize, usersController.createUserAccount);
router.delete('/', authorizationController.authorize, usersController.removeUserAccount);

// Users routers

// Admin/Users routers

// Anonymous routers
router.post("/signin", authorizationController.login);
router.get("/authorize", authorizationController.authorize, usersController.userIsAuthorized);

module.exports = router;