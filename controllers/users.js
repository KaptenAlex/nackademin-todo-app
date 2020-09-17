const usersModel = require('../models/users.js');
const todoItemModel = require('../models/todos.js');
const todoListModel = require('../models/todoList.js');

module.exports = {
    createUserAccount: async(req, res) => {
        try {
            if (req.user.role != "admin") {
                res.status(401).json({error: "User needs to be an admin to create new account"});
            } else {
                console.log('controller');
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
        try {
            let user = {
                username: req.user.username,
                role: req.user.role,
                id: req.user.id
            };
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json(error);
        }
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
            if (user.status == false) {
                res.status(200).json(user);
            } else {                
                res.status(200).json(user);
            }
        } catch(err) {
            res.status(400).json(err);
        }
    },
    deleteUserDataFromDB: async(req, res) => {
        try {
            if(req.user.role == 'user') {
                if(req.user.id == null || req.user.id == '') {
                    res.status(400).json({message: 'User data could not be deleted, please try again.'});
                }
                await todoItemModel.deleteUsersTodoItems(req.user.id);
                await todoListModel.deleteUsersTodoLists(req.user.id);
                await usersModel.removeUser(req.user.id);
    
                res.status(200).json({message: 'You have deleted all data related to you, we hope you will use our todo app again!'});
            } else {
                res.status(400).json({message: 'Only accounts with the role user can be deleted, sorry comrade.'});
            }
        } catch (error) {
            res.status(400).json(err);
        }
    },
    getUserDataFromDB: async(req, res) => {
        try {
            if (req.user.role == 'user') {
                if(req.user.id == null || req.user.id == '') {
                    res.status(400).json({message: 'User data could not be requested, please try again.'});
                }
                if (req.user.username == null || req.user.username == '') {
                    res.status(400).json({message: 'User data could not be requested, please try again.'});
                } else {
                    let userObject = await usersModel.getUser(req.user.username);
                    let todoListObject = await todoListModel.getTodoListsForUser(req.user.id);
                    let todoItemObject = await todoItemModel.getUsersTodoItems(req.user.id);

                    res.status(200).json({user: userObject, todoLists: todoListObject, todoItems: todoItemObject});
                }
            } else {
                res.status(400).json({message: 'Only accounts with the role user can request their data, sorry comrade.'});
            }
        } catch (error) {
            res.status(400).json(err);
        }
    }
}