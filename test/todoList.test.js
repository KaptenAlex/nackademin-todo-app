const todoListModel = require('../models/todoList.js');
const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { expect, assert } = require('chai');
const { createTodoItem } = require('../models/todos.js');

chai.should();
chai.use(chaiAsPromised);

describe('Todo list model', () => {
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
        let createdTodoList = await todoListModel.createTodoList({
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare'
        });
        createdTodoList.should.be.an('object');
        expect(createdTodoList).to.deep.equal({
            title: 'TodoList with Mocha and Chai',
            ownerId: 'Testare',
            _id: createdTodoList._id
        });
    });

    it('getTodoLists() | Should retrive an array with three todolists', async function() {
        let getListOfTodoLists = await todoListModel.getTodoLists();
        expect(getListOfTodoLists).to.be.an('array').with.lengthOf(3);
    });

    it('updateTodoList() | Should create a todoList, then update it, and return 1 to indicated success on updating title field.', async function() {
        let createTodoList = await todoListModel.createTodoList({
            title: 'update this title, please I beg of you',
            ownerId: 'Fredde'
        });
        let updateCreatedTodoList = await todoListModel.updateTodoList({
            title: 'Ah, much better title now'
        }, createTodoList._id);

        updateCreatedTodoList.should.be.equal(1);
    });

    it('countTodoLists() | Should count three objects in database', async function() {
        let countTodoListsBeforeClearDB = await todoListModel.countTodoLists();

        countTodoListsBeforeClearDB.should.be.an('number');
        countTodoListsBeforeClearDB.should.equal(3);
    });

    it('deleteTodoList() | Should create a todolist, remove it and return a 1, then look for it and get an error', async function() {
        let createTodoList = await todoListModel.createTodoList({
            title: 'I have a bad feeling about this...',
            ownerId: 'Foreshadowing'
        });
        let deleteTodoList = await todoListModel.deleteTodoList(createTodoList._id);
        
        deleteTodoList.should.be.an('number');
        deleteTodoList.should.be.equal(1);
        await expect(todoListModel.getTodoList(createTodoList._id)).to.be.rejectedWith(Error);
    })
});