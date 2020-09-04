const todoListModel = require('../models/todoList.js');

module.exports = {
    getTodoLists: async(req, res) => {
        try {
            let todoLists = await todoListModel.getTodoLists();
            res.json(todoLists);
        } catch (error) {
            res.json(error);
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
                title: req.body.title
            }
            let getTodoList = await todoListModel.createTodoList(todoList);
            res.json(getTodoList)
        } catch (error) {
            res.json(error);
        }
    },
    updateTodoList: async(req, res) => {
        try {
            let updatedTodoList = {
                title: req.body.title
            }
            let updateTodoList = await todoListModel.updateTodoList(updatedTodoList, req.params.id);
            res.json(updateTodoList);
        } catch (error) {
            res.json(error);
        }
    },
    deleteTodoList: async(req, res) => {
        try {
            let updateTodoList = await todoListModel.deleteTodoList(req.params.id);
            res.json(updateTodoList);
        } catch (error) {
            res.json(error);

        }
    }
}