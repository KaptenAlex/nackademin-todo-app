const todoListModel = require('../models/todoList.js');
const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const { expect, assert } = require('chai');

chai.should();
chai.use(chaiAsPromised);

describe('Todo list model', () => {
    beforeEach('Clear DB and create three lists', async() => {
        await todoListModel.clearTodoListDatabase();
        for (let i = 0; i < 3; i++) {
            await todoListModel.createTodoList({
                title: `Todolist: ${i}`
            });
        }
    });

    it('createTodoList() & getTodoList() | Should create a todolist and find it', async() => {
        let createdTodoList = await todoListModel.createTodoList({
            title: 'TodoList with Mocha and Chai'
        });
        let findTodoList = await todoListModel.getTodoList(createdTodoList._id);
        
        createdTodoList.should.be.an('object');
        findTodoList.should.be.an('object');
        (createdTodoList._id).should.be.equal(findTodoList._id);
        (createdTodoList.title).should.be.equal(findTodoList.title);
    });

    it('Should retrive an array with three todolists with the type object', async() => {
        let getListOfTodoLists = await todoListModel.getTodoLists();
        expect(getListOfTodoLists).to.be.an('array').with.lengthOf(3);
    });

    it('createTodoList(), getTodoList() & updateTodoList() | Should create a todoList, find it and then update it, and finally find it again.', async() => {
        let createTodoList = await todoListModel.createTodoList({
            title: 'update this title, please I beg of you'
        });
        let findCreatedTodoList = await todoListModel.getTodoList(createTodoList._id);
        let updateCreatedTodoList = await todoListModel.updateTodoList({
            title: 'Ah, much better title now'
        }, findCreatedTodoList._id);
        let findUpdatedTodoList = await todoListModel.getTodoList(createTodoList._id);

        createTodoList.should.be.an('object');
        (createTodoList.title).should.equal('update this title, please I beg of you');

        findCreatedTodoList.should.be.an('object');
        (findCreatedTodoList._id).should.equal(createTodoList._id);
        (findCreatedTodoList.title).should.equal('update this title, please I beg of you');

        updateCreatedTodoList.should.be.equal(1);

        (findUpdatedTodoList._id).should.equal(createTodoList._id);
        (findUpdatedTodoList._id).should.equal(findCreatedTodoList._id);
        (findUpdatedTodoList.title).should.equal('Ah, much better title now');
    });

    it('countTodoLists() & clearTodoListDatabase() | Should count three objects in database, clear database and then count zero objects in database', async() => {
        let countTodoListsBeforeClearDB = await todoListModel.countTodoLists();
        let clearTodoListDB = await todoListModel.clearTodoListDatabase();
        let countTodoListsAfterClearDB = await todoListModel.countTodoLists();


        countTodoListsBeforeClearDB.should.be.an('number');
        countTodoListsBeforeClearDB.should.equal(3);

        clearTodoListDB.should.be.an('number');
        clearTodoListDB.should.equal(3);

        countTodoListsAfterClearDB.should.be.an('number');
        countTodoListsAfterClearDB.should.equal(0);
    });

    it('createTodoList(), getTodoList() & deleteTodoList() | Should create a todolist, find the created todolist, remove it and then look for it and get no result from DB', async() => {
        let createTodoList = await todoListModel.createTodoList({
            title: 'I have a bad feeling about this...'
        });
        let getTodoList = await todoListModel.getTodoList(createTodoList._id);
        let deleteTodoList = await todoListModel.deleteTodoList(getTodoList._id);
        await expect(todoListModel.getTodoList(getTodoList._id)).to.be.rejectedWith(Error);

        createTodoList.should.be.an('object');
        (createTodoList.title).should.be.equal('I have a bad feeling about this...');

        getTodoList.should.be.an('object');
        (getTodoList.title).should.be.equal(createTodoList.title);
        (getTodoList._id).should.be.equal(createTodoList._id);

        deleteTodoList.should.be.an('number');
        deleteTodoList.should.be.equal(1);
    })
});