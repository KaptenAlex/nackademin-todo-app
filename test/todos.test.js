const todosModel = require('../models/todos.js');
const chai = require('chai').should();

let createTodoItemId = '';

/*
describe('hooks', function () {
    before( function() {
        
    })
})
*/

describe('createTodoItem function', function() {
    it('Should return an object with the newly created todo item', async function() {
        let todoItem = {
            title: "Mocha/Chai test title",
            content: "Mocha/Chai testing content",
            completed: false,
            created: Date.now(),
            updated: Date.now()
        };
        let createTodoItem = await todosModel.createTodoItem(todoItem);
        createTodoItemId = createTodoItem._id;
        createTodoItem.should.be.an('object');
    });
});

describe('loadAllTodoItems function', function() {
    it('Should return a array with every todo item in todo db', async function() {
        let loadAllTodoItems = await todosModel.loadAllTodoItems();
        loadAllTodoItems.should.be.an('array');
    });
});

describe('loadAllTodoItemsForUser function', function() {
    it('Should return an array with todoitems for specific user', async function() {
        let loadAllTodoItemsForUser = await todosModel.loadAllTodoItemsForUser(5, "testing_with_chai");
        loadAllTodoItemsForUser.should.be.an('array'); 
    });
});

describe('countTodoItems function', function() {
    it('Should return a number representing how many pages are available', async function() {
        let loadAllTodoItemsForUser = await todosModel.countTodoItems();
        loadAllTodoItemsForUser.should.be.an('number');
    });
});

describe('updateTodoItem function', function() {
    it('Should return a number with how many fields that have been updating in choosen document', async function() {
        let todoItem = {
            title: "Mocha/Chai test update title",
            content: "Mocha/Chai testing updating content",
            completed: true,
            updated: Date.now()
        };
        let loadAllTodoItemsForUser = await todosModel.updateTodoItem(todoItem, createTodoItemId);
        loadAllTodoItemsForUser.should.be.an('number');
    });
});

describe('loadLatestCreated function', function() {
    it('Should return an array with objects', async function() {
        let loadLatestCreated = await todosModel.loadLatestCreated();
        loadLatestCreated.should.be.an('array');
    });
});

describe('loadLatestUpdated function', function() {
    it('Should return an array with objects', async function() {
        let loadLatestCreated = await todosModel.loadLatestUpdated();
        loadLatestCreated.should.be.an('array');
    });
});

describe('deleteTodoItem function', function() {
    it('Should return a number, with the value of 1 to indicate success in deleting a todo item', async function() {
        let createTodoItem = await todosModel.deleteTodoItem(createTodoItemId);
        createTodoItem.should.be.an('number');
        createTodoItem.should.equal(1);
    });
});