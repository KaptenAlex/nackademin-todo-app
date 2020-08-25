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
    async loadAllTodoItems(skipNumber = 5) {
        return new Promise( (resolve, reject) => {
            todoDatabase.find({}).sort({ created: -1}).skip(skipNumber * 5).limit(8).exec((err, allTodoItems) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(allTodoItems)
                }
            });
        });
    },
    async countTodoItems() {
        return new Promise( (resolve, reject) => {
            todoDatabase.count({}, (err, numOfTodoItems) => {
                if (err) {
                    reject(err);
                } else {
                    //Calculate how many pages are required to show all documents on the SPA
                    let numOfTodoItemsPages = numOfTodoItems / 8;
                    // Then round it upwards to be able to show the last page of all todoitems.
                    let numOfPagesNeeded = Math.ceil(numOfTodoItemsPages);
                    //Have to add one extra page because neDB is weird like that
                    resolve(numOfPagesNeeded + 1);
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
    }
};