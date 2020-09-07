const todosModel = require('../models/todos.js');
const usersModel = require('../models/users.js');
const authorizationController = require('../controllers/authorization.js')
const chai = require('chai');
const chaiHttp = require('chai-http');
let chaiAsPromised = require("chai-as-promised");
const app = require('../app.js');

const { expect, assert } = require('chai');
chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Todos http requests', function() {
    beforeEach('Clear test DB and create some todo items', async() => {
        await todosModel.clearDatabase();
        await usersModel.clearDatabase();
        let todoItem = {
            title: 'TodoItem: ',
            completed: false,
            created: Date.now(),
            updated: Date.now(),
            userId: 'Fredde'
        };
        for (let i = 0; i < 2; i++) {
            todoItem.title + i;
            await todosModel.createTodoItem(todoItem);
        }
        todoItem.userId = 'Alex';
        for (let i = 0; i < 5; i++) {
            todoItem.title + i;
            await todosModel.createTodoItem(todoItem);    
        }
        let newUser = {
            username: "kalle",
            password: '123',
            role: 'user'
        };
        await usersModel.createAccount(newUser.username, newUser.password, newUser.role);
        newUser.username = 'alex';
        newUser.role = 'admin';
        await usersModel.createAccount(newUser.username, newUser.password, newUser.role);
        let getAdminAccount = await usersModel.getUser('alex');
        console.log(getAdminAccount);

    });

    it('Should get an 200 response with a todo item', async() => {

    });
})