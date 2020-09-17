const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, required: true},
    created: {type: String, default: Date.now(), required: true},
    updated: {type: String, default: Date.now(), required: true},
    userId: {type: String, required: true},
    todoListId: {type: String, required: true}
}, {versionKey: false });

const Todoitem = mongoose.model('Todoitem', todoItemSchema);

module.exports = {
    async clearDatabase() {
        try {
            return (await Todoitem.deleteMany({})).deletedCount;
        } catch (error) {
            return {message: "Todo item DB has not been cleared", status: false};
        }
    },
    async createTodoItem(todoObject) {
        try {
            let todoItem = await Todoitem.create(todoObject);
            return todoItem;
        } catch (error) {
            return {message: "Todo item has not been created", status: false};
        }
    },
    async loadAllTodoItems(skipNumber = 5, todoListId) {
        try {
            let todoItems = await Todoitem.find({todoListId: todoListId}).limit(8).skip(skipNumber * 5);
            return todoItems;
        } catch (error) {
            return {message: "Todo items could not be loaded", status: false};
        }
    },
    async countTodoItemsPages(todoListId) {
        try {
            let countTodoItems = await Todoitem.countDocuments({todoListId: todoListId}, function(err, count) {
                if (err) { return error; }
                let numOfTodoItemsPages = count / 8;
                let numOfPagesNeeded = Math.ceil(numOfTodoItemsPages);
                return numOfPagesNeeded;
            });
            return countTodoItems;
        } catch (error) {
            return {message: "Could not load todo items", status: false};
        }
    },
    async updateTodoItem(todoItem, todoItemID) {
        try {
            let updateTodoItem = await Todoitem.updateOne( {_id: todoItemID}, todoItem );
            return updateTodoItem.nModified;   
        } catch (error) {
            return {message: "Could not update todo item, please try again", status: false};
        }
    },
    async loadLatestCreated(todoListId) {
        try {
            let latestCreated = await Todoitem.find({todoListId: todoListId}).sort('created -created').limit(8);
            return latestCreated;
        } catch (error) {
            return {message: "Could not load latest created, please try again", status: false};
        }
    },
    async loadLatestUpdated(todoListId) {
        try {
            let latestUpdated = await Todoitem.find({todoListId: todoListId}).sort('updated -updated').limit(8);
            return latestUpdated;
        } catch (error) {
            return {message: "Could not load latest updated, please try again", status: false};
        }
    },    
    async deleteTodoItem(todoItemID) {
        try {
            let deleteTodoItem = (await Todoitem.deleteOne({_id: todoItemID})).deletedCount;
            return deleteTodoItem;
        } catch (error) {
            return {message: "Could not delete todo item, please try again", status: false};
        }
    },
    async countTodosItems() {
        try {
            let countTodoItems = await Todoitem.countDocuments({}, function(error, numberOfTodoItems) {
                if (error) { return error; }
                return numberOfTodoItems;
            });
            return countTodoItems;
        } catch (error) {
            return {message: "Could not count todo items, please try again", status: false};
        }
    },
    async findOneTodoItem(todoItemID) { 
        try {
            let findTodoItem = await Todoitem.findById(todoItemID, function(error, todoItem) {
                if (error) { return error; }
                return todoItem;
            });
            return findTodoItem;
        } catch (error) {
            return {message: "Could not find the todo item, please try again", status: false };
        }
    },
    async deleteUsersTodoItems(userId) {
        try {
            let deleteUsersTodoItems = await Todoitem.deleteMany({userId: userId});
            return deleteUsersTodoItems.deletedCount;
        } catch (error) {
            return {message: "Could not delete delete users todo items, please try again", status: false };
        }
    },
    async getUsersTodoItems(userId) {
        try {
            let getUsersTodoItems = await Todoitem.find({userid: userId});
            return getUsersTodoItems;
        } catch (error) {
            return {message: "Could not get users todo items, please try again", status: false };
        }
    }
};