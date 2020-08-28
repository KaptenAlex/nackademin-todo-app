const usersModel = require('../models/users.js');

module.exports = {
    createUserAccount: async(req, res) => {
        try {
            let createAccountResults = await usersModel.createAccount(req.body.username, req.body.password, req.body.role);
            if (createAccountResults.status) {
                res.json(createAccountResults.message).status(201);
            } else {
                res.json(createAccountResults.message).status(500);
            }
        } catch (error) {
            res.json(error)
        }
    },
    userIsAuthorized: (req, res) => {
        let user = {
            username: req.user.username,
            role: req.user.role
        }
        res.json(user);
    },
    getAllUsers: async(req, res) => {
        try {
            if (req.user.role == "admin") {
                res.json(await usersModel.getUsers());
            } else {
                res.json({message: "User lacks privliges for this function"});
            }   
        } catch (error) {
            res.json(error)
        }
    }
}