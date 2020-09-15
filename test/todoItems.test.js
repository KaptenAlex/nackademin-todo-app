const todosModel = require('../models/todos.js');
const chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');
chai.should();
chai.use(chaiAsPromised);

describe('Todo model', async function() {
    beforeEach('Clear todo database and create one todo item before the next it clause', async function() {
        await todosModel.clearDatabase();
        
        let todoItem = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'

        };
        let createdTodoItem = await todosModel.createTodoItem(todoItem);
        this.currentTest.createTodoItemId = createdTodoItem._id;
    });

    describe('createTodoItem()', function() {
        it('Should create a todo item, then return the same todo item and save its id', async function() {
            // Arrange
            let newTodo = {
                title: "Mocha/Chai test title",
                completed: false,
                created: Date.now(),
                updated: Date.now(),
                userId: 'testing_with_chai',
                todoListId: 'todolistTest'
            };
            // Act
            let createTodoItem = await todosModel.createTodoItem(newTodo);

            // Assert
            createTodoItem.should.be.an('object');
            createTodoItem.should.deep.equal({
                title: newTodo.title,
                completed: newTodo.completed,
                created: newTodo.created,
                updated: newTodo.updated,
                userId: newTodo.userId,
                todoListId: 'todolistTest',
                _id: createTodoItem._id
            });
        });
        it('Should return an error because the length of the title is restricted to 5-50 characters long', function(done) {
            // Arrange
            todoItem = {
                title: "Chai",
                completed: false,
                created: Date.now(),
                updated: Date.now(),
                userId: 'testing_with_chai',
                todoListId: 'todolistTest'
            }
            // Act
            let createTodoItem = todosModel.createTodoItem(todoItem);

            // Assert
            createTodoItem.should.be.rejected.and.notify(done);
        });
    })

    it('loadAllTodoItems() | Should return a array with two todo items from todo db', async function() {
         // Arrange
         let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);
         // Act
         let loadAllTodoItems = await todosModel.loadAllTodoItems(0, 'todolistTest');

         // Assert
        loadAllTodoItems.should.be.an('array');
        loadAllTodoItems.should.have.lengthOf(2);
    });

    it('loadAllTodoItemsForUser() | Should return an array with todoitems for specific user', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);
        // Act
        let loadAllTodoItemsForUser = await todosModel.loadAllTodoItemsForUser(0, 'todolistTest');
        
        // Assert
        loadAllTodoItemsForUser.should.be.an('array');
        loadAllTodoItemsForUser.forEach(todoItem => expect(todoItem.userId).to.equal('testing_with_chai'));
        loadAllTodoItemsForUser.should.have.lengthOf(2);
        
    });

    it('countTodoItemsPages() | Should return a number representing how many pages should be created for the available todo items', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);
        // Act
        let countTodoItems = await todosModel.countTodoItemsPages('todolistTest');
        
        // Assert
        countTodoItems.should.be.an('number');
        countTodoItems.should.equal(1);
    });

    it('updateTodoItem() | Should return a value with 1 with how many fields that have been updated in targeted todo item', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        let newTodoItem = await todosModel.createTodoItem(newTodo);

        // Act
        let updateTodoItem = {
            title: "Mocha/Chai test update title",
            completed: true,
            updated: Date.now()
        };
        let loadAllTodoItemsForUser = await todosModel.updateTodoItem(updateTodoItem, newTodoItem._id);
        
        // Assert
        loadAllTodoItemsForUser.should.be.an('number');
        loadAllTodoItemsForUser.should.equal(1);
    });

    //TODO: implement changes from models
    it('loadLatestCreated() | Should return an array with objects', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);

        // Act
        let loadLatestCreated = await todosModel.loadLatestCreated('todolistTest');
        
        // Assert        
        loadLatestCreated.should.be.an('array');
        loadLatestCreated.should.have.lengthOf(2);
    });

    //TODO: implement changes from models
    it('loadLatestUpdated() | Should return an array with objects', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);

        // Act
        let loadLatestUpdated = await todosModel.loadLatestUpdated('todolistTest');
        
        // Assert
        loadLatestUpdated.should.be.an('array');
        loadLatestUpdated.should.have.lengthOf(2);
    });

    it('deleteTodoItem() | Should return a number, with the value of 1 to indicate success in deleting a todo item', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        let newTodoItem = await todosModel.createTodoItem(newTodo);
        // Act
        let createTodoItem = await todosModel.deleteTodoItem(newTodoItem._id);
        
        // Assert
        createTodoItem.should.be.an('number');
        createTodoItem.should.equal(1);
    });

    it('countTodosItem() | Should return a number, with the value of 1.', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);

        // Act
        let numOfItemscount = await todosModel.countTodosItems();
        
        // Assert
        numOfItemscount.should.be.an('number');
        numOfItemscount.should.equal(2);
    });

    it('clearDatabase() | Should clear the entire database of posts', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai'
        };
        await todosModel.createTodoItem(newTodo);

        // Act
        let clearDatabase = await todosModel.clearDatabase();
        
        // Assert
        clearDatabase.should.be.an('number');
    });
});