const usersModel = require('../models/users.js');

module.exports = {
    createUserAccount: async(req, res) => {
        try {
            if (req.user.role != "admin") {
                res.status(401).json({error: "User needs to be an admin to create new account"});
            } else {
                let createAccountResults = await usersModel.createAccount(req.body.username, req.body.password, req.body.role);

                if (createAccountResults.status) {
                    res.status(201).json(createAccountResults.message);
                } else {
                    res.status(400).json(createAccountResults.message);
                }
            }
        } catch (error) {
            res.json(error)
        }
    },
    userIsAuthorized: (req, res) => {
        let user = {
            username: req.user.username,
            role: req.user.role,
            id: req.user.id
        }
        res.json(user);
    },
    getAllUsers: async(req, res) => {
        try {
            if (req.user.role == "admin") {
                res.status(200).json(await usersModel.getUsers());
            } else {
                res.status(401).json({message: "User lacks privileges for this function"});
            }   
        } catch (error) {
            res.status(400).json(error)
        }
    },
    removeUserAccount: async(req, res) => {
        try {
            if(req.user.role == "admin") {
                let deleteResults = await usersModel.removeUser(req.params.id);
                if (deleteResults == 1) {
                    res.status(200).json('User has been deleted');
                } else {
                    res.status(400).json('User has not been deleted');
                }
            } else {
                res.status(401).json({message: "User lacks privileges for this function"});
            }
        } catch (error) {
            res.json(error)
        }
    },
    loginUser: async(req, res) => {
        try {
            const user = await usersModel.loginUser(req.body.username, req.body.password);
            res.json(user);
        } catch(err) {
            res.sendStatus(401)
        }
    }
}