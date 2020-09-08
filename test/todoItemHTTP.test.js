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
        for (let i = 0; i < 4; i++) {
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
    //TODO: Add test where user has the role user
    it('Should get a 201 response with an array of eight of nine todo items', async function() {
        const resp = await chai.request(app)
        .get('/todos/todos/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(8);
        (resp.body).forEach(todoItem => expect(todoItem).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'created', 'updated']));
    });

    it('Should get a 201 with an array with eight of the latest created todo items', async function() {
        const resp = await chai.request(app)
        .get('/todos/sort/created')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(8);
        (resp.body).forEach(todoItem => expect(todoItem).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'created', 'updated']));
    });

    it('Should get a 201 with an array of eight of the latest updated todo items', async function() {
        const resp = await chai.request(app)
        .get('/todos/sort/updated')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(8);
        (resp.body).forEach(todoItem => expect(todoItem).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'created', 'updated']));
    });
});