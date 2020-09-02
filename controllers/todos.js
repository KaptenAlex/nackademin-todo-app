const todoModel = require('../models/todos.js');

module.exports = {
    loadIndex: (req, res) => {
        res.redirect('index.html');
    },
    loadAllTodoItems: async(req, res) => {
        try {
            let page = req.query.page;
            if (req.user.role == "admin") {
                let allTodoItems = await todoModel.loadAllTodoItems(page);
                res.json(allTodoItems);
            } else {
                let allTodoItems = await todoModel.loadAllTodoItemsForUser(page, req.user.id);
                res.json(allTodoItems);
            }
        } catch (error) {
            res.json(error);
        }
    },
    countTodoItemsPages: async(req, res) => {
        try {
            res.json(await todoModel.countTodoItemsPages());
        } catch (error) {
            res.json(error);
        }
    },
    createTodoItem: async(req, res) => {
        try {
            let todoItem = {
                title: req.body.title,
                content: req.body.content,
                completed: false,
                created: Date.now(),
                updated: Date.now()
            };
            res.json(await todoModel.createTodoItem(todoItem));
        } catch (error) {
            res.json(error);
        }
    },
    updateTodoItem: async(req, res) => {
        try {
            let todoItemID = req.params.id;
            let todoItem = {
                title: req.body.title,
                completed: req.body.completed,   
                updated: Date.now(),
            };
            res.json(await todoModel.updateTodoItem(todoItem, todoItemID));
        } catch (error) {
            res.json(error);
        }
    },
    deleteTodoItem: async(req, res) => {
        try {
            let todoItemID = req.params.id;
            res.json(await todoModel.deleteTodoItem(todoItemID));
        } catch (error) {
            res.json(error);
        }
    },
    loadLatestCreated: async(req, res) => {
        try {
            res.json(await todoModel.loadLatestCreated());
        } catch (error) {
            res.json(error);
        }
    },
    loadLatestUpdated: async(req, res) => {
        try {
            res.json(await todoModel.loadLatestUpdated());
        } catch (error) {
            res.json(error);
        }
    }
};