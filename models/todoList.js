const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
    title: {type: String, required: true},
    ownerId: {type: String, required: true}
}, { versionKey: false });

const Todolist = mongoose.model('Todolist', todolistSchema)

module.exports = {
    async getTodoLists() {
        try {
            let getTodoLists = await Todolist.find({});
            return getTodoLists;
        } catch (error) {
            return {message: "Could not get todolists, please try again", status: false};
        }
    },
    async getTodoListsForUser(userId) {
        try {
            let getTodoLists = await Todolist.find({ownerId: userId});
            return getTodoLists;
        } catch (error) {
            return {message: "Could not get todolists, please try again", status: false};
        }
    },
    async getTodoList(todoListId) {
        try {
            let getTodoList = await Todolist.findById(todoListId);
            return getTodoList;
        } catch (error) {
            return {message: "Could not get todolist, please try again", status: false};
        }
    },
    async createTodoList(newTodoList) {
        try {
            let createTodoList = await Todolist.create(newTodoList);
            return createTodoList;
        } catch (error) {
            return {message: "Could not create todolist, please try again", status: false};
        }
    },
    async updateTodoList(todoList, todoListId) {
        try {
            let updateTodoList = await Todolist.updateOne({_id: todoListId}, todoList);
            return updateTodoList.nModified;
        } catch (error) {
            return {message: "Could not update todolist, please try again", status: false};
        }
    },
    async deleteTodoList(todoListId) {
        try {
            let deleteTodolist = await Todolist.deleteOne({_id: todoListId});
            return deleteTodolist.deletedCount;
        } catch (error) {
            return {message: "Could not delete todolist, please try again", status: false};
        }
    },
    async clearTodoListDatabase() {
        try {
            let deleteAllTodoLists = await Todolist.deleteMany({});
            return deleteAllTodoLists.deletedCount;
        } catch (error) {
            return {message: "Could not clear todolist DB, please try again", status: false};
        }
    },
    async countTodoLists() {
        try {
            let countTodoLists = await Todolist.countDocuments({}, function(error, numberOfTodoLists){
                if (error) { return error; }
                return numberOfTodoLists;
            });
            return countTodoLists;
        } catch (error) {
            return {message: "Could not count todolists, please try again", status: false};
        }
    },
    async deleteUsersTodoLists(userId) {
        try {
            let deleteUsersTodoLists = await Todolist.deleteMany({ownerId: userId});
            return deleteUsersTodoLists.deletedCount;
        } catch (error) {
            return {message: "Could not delete users todolists, please try again", status: false};
        }
    }


    /*
    async deleteUsersTodoLists(ownerId) {
        return new Promise( (resolve, reject) => {
            todoListDatabase.remove({ownerId: ownerId}, {multi: true}, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    */
}