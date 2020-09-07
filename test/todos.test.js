const todosModel = require('../models/todos.js');
const chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(chaiAsPromised);

let todoItem = {
    title: "Mocha/Chai test title",
    completed: false,
    created: Date.now(),
    updated: Date.now(),
    userId: 'testing_with_chai'
};

describe('Todo model', async function() {
    beforeEach('Clear todo database and create one todo item before the next it clause', async function() {
        await todosModel.clearDatabase();
        let createdTodoItem = await todosModel.createTodoItem(todoItem);
        this.currentTest.createTodoItemId = createdTodoItem._id;
    });

    describe('createTodoItem()', function() {
        it('Should create a todo item, then return the same todo item and save its id', async function() {
            let createTodoItem = await todosModel.createTodoItem(todoItem);
            createTodoItem.should.be.an('object');
            createTodoItem.should.deep.equal({
                title: todoItem.title,
                completed: todoItem.completed,
                created: todoItem.created,
                updated: todoItem.updated,
                userId: todoItem.userId,
                _id: createTodoItem._id
            });
        });
        it('Should return an error because the length of the title is restricted to 5-50 characters long', function(done) {
            todoItem = {
                title: "Chai",
                completed: false,
                created: Date.now(),
                updated: Date.now(),
                userId: 'testing_with_chai'
            }
            let createTodoItem = todosModel.createTodoItem(todoItem);
            createTodoItem.should.be.rejected.and.notify(done);
        });
    })

    it('loadAllTodoItems() | Should return a array with one todo item from todo db', async function() {
        let loadAllTodoItems = await todosModel.loadAllTodoItems(0);

        loadAllTodoItems.should.be.an('array');
        loadAllTodoItems.should.have.lengthOf(1);
    });

    it('loadAllTodoItemsForUser() | Should return an array with todoitems for specific user', async function() {
        let loadAllTodoItemsForUser = await todosModel.loadAllTodoItemsForUser(0, 'testing_with_chai');

        loadAllTodoItemsForUser.should.be.an('array');
        loadAllTodoItemsForUser[0].should.have.property('userId').with.equal('testing_with_chai')
        loadAllTodoItemsForUser.should.have.lengthOf(1);
    });

    it('countTodoItemsPages() | Should return a number representing how many pages should be created for the available todo items', async function() {
        let countTodoItems = await todosModel.countTodoItemsPages();

        countTodoItems.should.be.an('number');
        countTodoItems.should.equal(1);
    });

    it('updateTodoItem() | Should return a value with 1 with how many fields that have been updated in targeted todo item', async function() {
        let updateTodoItem = {
            title: "Mocha/Chai test update title",
            completed: true,
            updated: Date.now()
        };

        let loadAllTodoItemsForUser = await todosModel.updateTodoItem(updateTodoItem, this.test.createTodoItemId);

        loadAllTodoItemsForUser.should.be.an('number');
        loadAllTodoItemsForUser.should.equal(1);
    });

    it('loadLatestCreated() | Should return an array with objects', async function() {
        let loadLatestCreated = await todosModel.loadLatestCreated();

        loadLatestCreated.should.be.an('array');
        loadLatestCreated.should.have.lengthOf(1);
    });

    it('loadLatestUpdated() | Should return an array with objects', async function() {
        let loadLatestUpdated = await todosModel.loadLatestUpdated();

        loadLatestUpdated.should.be.an('array');
        loadLatestUpdated.should.have.lengthOf(1);
    });

    it('deleteTodoItem() | Should return a number, with the value of 1 to indicate success in deleting a todo item', async function() {
        let createTodoItem = await todosModel.deleteTodoItem(this.test.createTodoItemId);

        createTodoItem.should.be.an('number');
        createTodoItem.should.equal(1);
    });

    it('countTodosItem() | Should return a number, with the value of 1.', async function() {
        let numOfItemscount = await todosModel.countTodosItems();

        numOfItemscount.should.be.an('number');
        numOfItemscount.should.equal(1);
    });

    it('clearDatabase() | Should clear the entire database of posts', async function() {
        let clearDatabase = await todosModel.clearDatabase();
        clearDatabase.should.be.an('number');
    });
});