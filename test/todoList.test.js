const todoListModel = require('../models/todoList.js');
const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');

chai.should();
chai.use(chaiAsPromised);

describe('Todo list model', async function() {
    /*
    beforeEach('Clear DB and create three lists', async function() {
        await todoListModel.clearTodoListDatabase();
        for (let i = 0; i < 3; i++) {
            await todoListModel.createTodoList({
                title: `Todolist: ${i}`,
                ownerId: 'Alex'
            });
        }
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
        expect(createdTodoList).to.deep.equal({
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

        // Act
        let updateCreatedTodoList = await todoListModel.updateTodoList({
            title: 'Ah, much better title now'
        }, createdTodoList._id);

        // Assert
        updateCreatedTodoList.should.be.equal(1);
    });

    it('countTodoLists() | Should count four objects in database', async function() {
        // Arrange
        let newTodoList = {
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare'
        }
        let createdTodoList = await todoListModel.createTodoList(newTodoList);

        // Act
        let countTodoListsBeforeClearDB = await todoListModel.countTodoLists();
        
        // Assert
        countTodoListsBeforeClearDB.should.be.an('number');
        countTodoListsBeforeClearDB.should.equal(4);
    });

    it('deleteTodoList() | Should create a todolist, remove it and return a 1, then look for it and get an error', async function() {
        // Arrange
        let createTodoList = await todoListModel.createTodoList({
            title: 'I have a bad feeling about this...',
            ownerId: 'Foreshadowing'
        });
        
        // Act
        let deleteTodoList = await todoListModel.deleteTodoList(createTodoList._id);
        
        // Assert
        deleteTodoList.should.be.an('number');
        deleteTodoList.should.be.equal(1);
        await expect(todoListModel.getTodoList(createTodoList._id)).to.be.rejectedWith(Error);
        
    })
    */
});