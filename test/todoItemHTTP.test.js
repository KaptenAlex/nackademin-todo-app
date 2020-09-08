const app = require('../app.js');
const todosModel = require('../models/todos.js');
const usersModel = require('../models/users.js');
const authorizationMiddleWare = require('../controllers/authorization.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
let chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Todoitems HTTP requests', function() {
    beforeEach('Clear test DB and create some todo items', async function() {
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
        this.currentTest.user = await usersModel.createAccount(newUser.username, newUser.password, newUser.role);

        newUser.username = 'alex';
        newUser.role = 'admin';

        this.currentTest.admin = await usersModel.createAccount(newUser.username, newUser.password, newUser.role);
        this.currentTest.token = await usersModel.loginUser('alex', '123');
    });

    it('Should get a 200 response with a todo item', async function() {
        chai.request(app)
        .get('/todos/todos/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', 'application/json')
        .end( (error, results) => {
            expect(results).to.have.status(201);
            expect(results).to.be.json
            console.log(results)
        });
    });
})