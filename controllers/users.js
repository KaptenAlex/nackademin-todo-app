const usersModel = require('../models/users.js');

module.exports = {
    createUserAccount: async(req, res) => {
        try {
            if (req.user.role != "admin") {
                res.json({error: "User needs to be an admin to create new account"}).status(401);
            } else {
                let createAccountResults = await usersModel.createAccount(req.body.username, req.body.password, req.body.role);

                if (createAccountResults.status) {
                    res.json(createAccountResults.message).status(201);
                } else {
                    res.json(createAccountResults.message).status(500);
                }
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
                res.json({message: "User lacks privileges for this function"});
            }   
        } catch (error) {
            res.json(error)
        }
    },
    removeUserAccount: async(req, res) => {
        try {
            if(req.user.role == "admin") {
                let deleteResults = await usersModel.removeUser(req.body.id);
                if (deleteResults == 1) {
                    res.json('User has been deleted');
                } else {
                    res.json('User has not been deleted');
                }
            } else {
                res.json({message: "User lacks privileges for this function"});
            }
        } catch (error) {
            res.json(error)
        }
    }
}