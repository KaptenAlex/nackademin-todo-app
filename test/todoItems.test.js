const Database = require('../models/databaseConnection.js');
const todosModel = require('../models/todos.js');
const chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');
chai.should();
chai.use(chaiAsPromised);

describe('Todo model', function() {
    before('Connect to database', async function() {
        await Database.connect();
    });

    beforeEach('Clear todo item DB and add two todo items', async function() {
        await todosModel.clearDatabase();
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);
    });
    
    after('Disconnect from database', async function() {
        await Database.disconnect();
    });

    it('clearDatabase() | Should clear the todo item DB', async function() {
        // Arrange
        let todoItem = {
            title: "Mocha/Chai test title",
            completed: false,
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(todoItem);

        // Act
        let clearDatabase = await todosModel.clearDatabase();

        // Assert
        clearDatabase.should.be.an('number');
        clearDatabase.should.be.equal(2);
    });

    it('Should create a todo item and return', async function() {
        let todoItem = {
            title: "Mocha/Chai test title",
            completed: false,
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
    
        let createTodoItem = await todosModel.createTodoItem(todoItem);
        expect(createTodoItem._doc).to.have.keys(['_id', 'title', 'completed', 'userId', 'todoListId', 'created', 'updated']);
    });
    
    
    it('loadAllTodoItems() | Should return a array with two todo items from todo db', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
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
    

    it('countTodoItemsPages() | Should return a number representing how many pages should be created for the available todo items', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        await todosModel.createTodoItem(newTodo);
        
        // Act
        let countTodoItems = await todosModel.countTodoItemsPages('todolistTest');
        
        // Assert
        countTodoItems.should.be.an('number');
        countTodoItems.should.equal(2);
    });


    it('updateTodoItem() | Should return a value with 1 with how many fields that have been updated in targeted todo item', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        let newTodoItem = await todosModel.createTodoItem(newTodo);

        // Act
        let updatedTodoItem = {
            title: "Mocha/Chai test update title",
            completed: true,
            updated: Date.now()
        };
        let updateTodoItem = await todosModel.updateTodoItem(updatedTodoItem, newTodoItem._doc._id);

        // Assert
        updateTodoItem.should.be.an('number');
        updateTodoItem.should.equal(1);
        
    });

    it('loadLatestCreated() | Should return an array with one objects', async function() {
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
        let createTodoItem = await todosModel.createTodoItem(newTodo);

        // Act
        let deleteTodoItem = await todosModel.deleteTodoItem(createTodoItem._doc._id);
        
        // Assert
        deleteTodoItem.should.be.an('number');
        deleteTodoItem.should.equal(1);
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

    it('findOneTodoItem() | Should return a todo item', async function() {
        // Arrange
        let newTodo = {
            title: "Mocha/Chai test title",
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'testing_with_chai',
            todoListId: 'todolistTest'
        };
        let createdTodoItem = await todosModel.createTodoItem(newTodo);

        // Act
        let findTodoItem = await todosModel.findOneTodoItem(createdTodoItem._doc._id);

        // Assert
        findTodoItem._doc.should.be.an('object');
        expect(findTodoItem._doc).to.have.keys(['_id', 'title', 'updated', 'created', 'completed', 'userId', 'todoListId']);
    });

    it('deleteUsersTodoItems() | Should delete a users todo items', async function(){
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
        await todosModel.createTodoItem(newTodo);
        await todosModel.createTodoItem(newTodo);

        // Act
        let deleteUsersTodoItems = await todosModel.deleteUsersTodoItems('testing_with_chai');

        // Assert
        deleteUsersTodoItems.should.be.an('number');
        deleteUsersTodoItems.should.be.equal(4);
    });

    it('getUsersTodoItems() | Should get an array with four todo items', async function(){
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
        await todosModel.createTodoItem(newTodo);
        await todosModel.createTodoItem(newTodo);

        // Act
        let getUsersTodoItems = await todosModel.getUsersTodoItems('testing_with_chai');

        // Assert
        getUsersTodoItems.should.be.an('array');
        getUsersTodoItems.forEach(todoItem => expect(todoItem._doc).to.have.keys(['_id', 'title', 'updated', 'created', 'completed', 'userId', 'todoListId']));
    });
/*
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
    */
});