const Database = require('../models/databaseConnection.js');
const todoListModel = require('../models/todoList.js');
const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');

chai.should();
chai.use(chaiAsPromised);

describe('Todo list model', async function() {
    
    before('Connect to database', async function() {
        await Database.connect();
    });

    beforeEach('Clear DB and create three lists', async function() {
        await todoListModel.clearTodoListDatabase();
        for (let i = 0; i < 3; i++) {
            await todoListModel.createTodoList({
                title: `Todolist: ${i}`,
                ownerId: 'Alex'
            });
        }
    });

    after('Disconnect from database', async function() {
        await Database.disconnect();
    });
    
    it('createTodoList() | Should create a todolist and control it has the correct values', async function() {
        // Arrange
        let newTodoList = {
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare'
        }
        // Act
        let createdTodoList = await todoListModel.createTodoList(newTodoList);

        // Assert
        createdTodoList.should.be.an('object');
        expect(createdTodoList._doc).to.deep.equal({
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare',
            _id: createdTodoList._id
        });
    });

    it('getTodoLists() | Should retrive an array with four todolists', async function() {
        // Arrange
        let newTodoList = {
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare'
        }
        await todoListModel.createTodoList(newTodoList);

        // Act
        let getListOfTodoLists = await todoListModel.getTodoLists();
        
        // Assert
        expect(getListOfTodoLists).to.be.an('array').with.lengthOf(4);
    });
    
    it('updateTodoList() | Should create a todoList, then update it, and return 1 to indicated success on updating title field.', async function() {
        // Arrange
        let newTodoList = {
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare'
        }
        let createdTodoList = await todoListModel.createTodoList(newTodoList);

        let updatedTodoList = {
            title: 'Ah, much better title now'
        }
        // Act
        let updateCreatedTodoList = await todoListModel.updateTodoList(updatedTodoList, createdTodoList._id);

        // Assert
        updateCreatedTodoList.should.be.equal(1);
    });

    
    it('countTodoLists() | Should count four objects in database', async function() {
        // Arrange
        let newTodoList = {
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare'
        }
        await todoListModel.createTodoList(newTodoList);

        // Act
        let countTodoListsBeforeClearDB = await todoListModel.countTodoLists();
        
        // Assert
        countTodoListsBeforeClearDB.should.be.an('number');
        countTodoListsBeforeClearDB.should.equal(4);
    });

    it('deleteTodoList() | Should create a todolist, remove it and return a 1, then look for it and get an error', async function() {
        // Arrange
        let newTodoList = {
            title: 'I have a bad feeling about this...',
            ownerId: 'Foreshadowing'
        };
        let createTodoList = await todoListModel.createTodoList(newTodoList);

        // Act
        let deleteTodoList = await todoListModel.deleteTodoList(createTodoList._id);

        // Assert
        deleteTodoList.should.be.an('number');
        deleteTodoList.should.be.equal(1);
    });
    
});