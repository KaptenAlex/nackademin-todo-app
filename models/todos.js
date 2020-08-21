const todoDatabase = require('./databaseConnection.js');

module.exports = {
    async createTodoItem(todoItem) {
        return new Promise( (resolve, reject) => {
            todoDatabase.insert(todoItem, (err, newTodoItem) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(newTodoItem);
                    }
               });
        });
    }, 
    async deleteTodoItem(todoItemID) {
        return new Promise( (resolve, reject) => {
            todoDatabase.remove({_id: todoItemID}, {}, (err, numOfTodoItemRemoved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numOfTodoItemRemoved);
                }
            });
        });
    },
    async loadAllTodoItems() {
        return new Promise( (resolve, reject) => {
            todoDatabase.find({}, (err, allTodoItems) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(allTodoItems)
                }
            });
        });
    },
    async updateTodoItem(todoItem, todoItemID) {
        return new Promise( (resolve, reject) => {
            todoDatabase.update({_id: todoItemID}, {$set:todoItem}, (err, updatedTodoItem) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(updatedTodoItem);
                }
            });
        });
    },
    async loadLatestCreated() {
        return new Promise( (resolve, reject) => {
            todoDatabase.find({}).sort({created: -1}).exec( (err, todoItems) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoItems);
                }
            })
        })
    },
    async loadLatestUpdated() {
        return new Promise( (resolve, reject) => {
            todoDatabase.find({}).sort({updated: -1}).exec( (err, todoItems) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoItems);
                }
            })
        })
    },
    async loadNextPage() {
        /*
        return new Promise( (resolve, reject) => {
            todoDatabase.find({}).sort({updated: -1}).exec( (err, todoItems) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoItems);
                }
            })
        })
        */
    },
    async loadPreviousPage() {
        /*
        return new Promise( (resolve, reject) => {
            todoDatabase.find({}).sort({updated: -1}).exec( (err, todoItems) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoItems);
                }
            })
        })
        */
    }
};