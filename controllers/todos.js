const todoModel = require('../models/todos.js');

module.exports = {
    loadIndex: (req, res) => {
        res.status(302).redirect('index.html');
    },
    loadAllTodoItems: async(req, res) => {
        try {
            let page = req.query.page || 0;
            if (req.user.role == "admin") {
                let allTodoItems = await todoModel.loadAllTodoItems(page, req.query.todoListId);
                res.status(201).json(allTodoItems);
            } else {
                let allTodoItems = await todoModel.loadAllTodoItemsForUser(page, req.query.todoListId);
                res.status(201).json(allTodoItems);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    countTodoItemsPages: async(req, res) => {
        try {
            res.status(201).json(await todoModel.countTodoItemsPages(req.params.todoListId));
        } catch (error) {
            res.status(400).json(error);
        }
    },
    createTodoItem: async(req, res) => {
        try {
            let todoItem = {
                title: req.body.title,
                content: req.body.content,
                completed: false,
                created: Date.now(),
                updated: Date.now(),
                userId: req.user.id,
                todoListId: req.body.todoListId
            };
            res.status(201).json(await todoModel.createTodoItem(todoItem));
        } catch (error) {
            res.status(400).json(error);
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
            res.status(201).json(await todoModel.updateTodoItem(todoItem, todoItemID));
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteTodoItem: async(req, res) => {
        try {
            let todoItemID = req.params.id;
            res.status(201).json(await todoModel.deleteTodoItem(todoItemID));
        } catch (error) {
            res.status(400).json(error);
        }
    },
    loadLatestCreated: async(req, res) => {
        try {
            res.status(201).json(await todoModel.loadLatestCreated(req.query.todoListId));
        } catch (error) {
            res.status(400).json(error);
        }
    },
    loadLatestUpdated: async(req, res) => {
        try {
            res.status(201).json(await todoModel.loadLatestUpdated(req.query.todoListId));
        } catch (error) {
            res.status(400).json(error);
        }
    }
};