const {postsDatabase} = require('./databaseConnection.js');

module.exports = {
    async createTodoItem(todoItem) {
        return new Promise( (resolve, reject) => {
            if(todoItem.title.length < 5 || todoItem.title.length < 50 ) { reject({error: "Title has to be between 5-50 characters long"})}
            postsDatabase.insert(todoItem, (err, newTodoItem) => {
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
            postsDatabase.remove({_id: todoItemID}, {}, (err, numOfTodoItemRemoved) => {
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
            postsDatabase.find({}).sort({ created: -1}).skip(skipNumber * 5).limit(8).exec((err, allTodoItems) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(allTodoItems)
                }
            });
        });
    },
    async loadAllTodoItemsForUser(skipNumber = 5, id) {
        return new Promise( (resolve, reject) => {
            postsDatabase.find({userId: id}).sort({ created: -1}).skip(skipNumber * 5).limit(8).exec((err, allTodoItems) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(allTodoItems)
                }
            });
        });
    },
    async countTodoItemsPages() {
        return new Promise( (resolve, reject) => {
            postsDatabase.count({}, (err, numOfTodoItems) => {
                if (err) {
                    reject(err);
                } else {
                    //Calculate how many pages are required to show all documents on the SPA
                    let numOfTodoItemsPages = numOfTodoItems / 8;
                    // Then round it upwards to be able to show the last page of all todoitems.
                    let numOfPagesNeeded = Math.ceil(numOfTodoItemsPages);
                    resolve(numOfPagesNeeded);
                }
            });
        });
    },
    async updateTodoItem(todoItem, todoItemID) {
        return new Promise( (resolve, reject) => {
            postsDatabase.update({_id: todoItemID}, {$set:todoItem}, (err, updatedTodoItem) => {
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
            postsDatabase.find({}).sort({created: -1}).exec( (err, todoItems) => {
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
            postsDatabase.find({}).sort({updated: -1}).exec( (err, todoItems) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoItems);
                }
            })
        })
    },
    async countTodosItems() {
        return new Promise( (resolve, reject) => {
            postsDatabase.count({}, (err, numOfTodos) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(numOfTodos)
                }
            })
        })
    },
    async clearDatabase() {
        return new Promise( (resolve, reject) => {
            postsDatabase.remove({}, {multi: true}, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    },
    async findOneTodoItem(id) {
        return new Promise( (resolve, reject) => {
            postsDatabase.findOne({_id: id}, (err, todoItem) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(todoItem);
                }
            });
        });
    }
};