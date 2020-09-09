const {todoListDatabase} = require('./databaseConnection.js');

module.exports = {
    async getTodoLists() {
        return new Promise((resolve, reject) => {
            todoListDatabase.find({}, (err, todoLists) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoLists);
                }
            });
        });
    },
    async getTodoListsForUser(userId) {
        return new Promise((resolve, reject) => {
            todoListDatabase.find({ownerId: userId}, (err, todoLists) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoLists);
                }
            });
        });
    },
    async getTodoList(id) {
        return new Promise((resolve, reject) => {
            todoListDatabase.findOne({_id: id}, (err, todoList) => {
                if (err) {
                    reject(err);
                } else {
                    if (todoList === null) {
                        reject(new Error(`Todolist doesn't exist with id: ${id}`))
                    } else {
                        resolve(todoList);
                    }
                }
            });
        });
    },
    async createTodoList(newTodoList) {
        return new Promise((resolve, reject) => {
            todoListDatabase.insert(newTodoList, (err, todoList) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoList);
                }
            });
        });
    },
    async updateTodoList(todoList, id) {
        return new Promise((resolve, reject) => {
            todoListDatabase.update({_id: id}, {$set: todoList},(err, todoList) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoList);
                }
            });
        });
    },
    async deleteTodoList(id) {
        return new Promise((resolve, reject) => {
            todoListDatabase.findOne({_id: id}, (errorFind, todoList) => {
                if (errorFind) {
                    reject(errorFind);
                } else {
                    todoListDatabase.remove({_id: id}, (errorRemove, removedTodoList) => {
                        if (errorRemove) {
                            reject(errorRemove);
                        } else {
                            resolve(removedTodoList);
                        }
                    });
                }
            });
        });
    },
    async clearTodoListDatabase() {
        return new Promise( (resolve, reject) => {
            todoListDatabase.remove({}, {multi: true}, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    async countTodoLists() {
        return new Promise( (resolve, reject) => {
            todoListDatabase.count({}, (error, numberOfTodoLists) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(numberOfTodoLists);
                }
            })
        })
    }
}