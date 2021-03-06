const express = require('express'); 
const router = express.Router();
const usersController = require('../controllers/users.js')
const authorizationController = require('../controllers/authorization.js')

// Admin routers
router.get("/", authorizationController.authorize, usersController.getAllUsers)
router.post("/", authorizationController.authorize, usersController.createUserAccount);
router.delete('/:id', authorizationController.authorize, usersController.removeUserAccount);

// Users routers
router.delete('/user/gdpr/removeUserData', authorizationController.authorize, usersController.deleteUserDataFromDB);
router.get('/user/gdpr/getUserData', authorizationController.authorize, usersController.getUserDataFromDB);

// Admin/Users routers

// Anonymous routers
router.post("/signin", usersController.loginUser);
router.get("/authorize", authorizationController.authorize, usersController.userIsAuthorized);

module.exports = router;