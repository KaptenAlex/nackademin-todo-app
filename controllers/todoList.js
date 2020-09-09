const todoListModel = require('../models/todoList.js');

module.exports = {
    getTodoLists: async(req, res) => {
        try {
            let todoLists = await todoListModel.getTodoLists();
            res.status(200).json(todoLists);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    getTodoList: async(req, res) => {
        try {
            let todoList = await todoListModel.getTodoList(req.params.id);
            res.json(todoList)
        } catch (error) {
            res.json(error);
        }
    },
    createTodoList: async(req, res) => {
        try {
            let todoList = {
                title: req.body.title,
                ownerId: req.body.ownerId
            };
            let getTodoList = await todoListModel.createTodoList(todoList);
            res.status(201).json(getTodoList)
        } catch (error) {
            res.status(400).json(error);
        }
    },
    updateTodoList: async(req, res) => {
        try {
            let updatedTodoList = {
                title: req.body.title,
                ownerId: req.body.ownerId
            }
            let updateTodoList = await todoListModel.updateTodoList(updatedTodoList, req.params.id);
            res.status(201).json(updateTodoList);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    deleteTodoList: async(req, res) => {
        try {
            let updateTodoList = await todoListModel.deleteTodoList(req.params.id);
            res.status(200).json(updateTodoList);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}