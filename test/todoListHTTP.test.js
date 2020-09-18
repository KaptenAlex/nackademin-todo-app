const app = require('../app.js');
const Database = require('../models/databaseConnection.js');
const todoListModel = require('../models/todoList.js');
const usersModel = require('../models/users.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
let chaiAsPromised = require("chai-as-promised");
const { expect, assert } = require('chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('TodoList HTTP requests', async function() {
    before('Connect to database', async function() {
        await Database.connect();
    });

    beforeEach('Clear users DB and create admin account', async function() {
        await todoListModel.clearTodoListDatabase();
        await usersModel.clearDatabase();

        let newUser = {
            username: "kalle",
            password: '123',
            role: 'user'
        };
        await usersModel.createAccount(newUser.username, newUser.password, newUser.role);

        newUser.username = 'alex';
        newUser.role = 'admin';
        await usersModel.createAccount(newUser.username, newUser.password, newUser.role);

        let adminId =  await usersModel.getUser(newUser.username);
        this.currentTest.adminId = adminId._id

        let todoList = {
            title: 'Todolist Test',
            ownerId: this.currentTest.adminId
        }
        await todoListModel.createTodoList(todoList);

        this.currentTest.token = await usersModel.loginUser(newUser.username, newUser.password);
    });

    after('Disconnect from database', async function() {
        await Database.disconnect();
    });

    it('Should return two todo lists', async function() {
        // Arrange
        let ownerId = this.test.adminId;
        let todoList = {
            title: 'Todolist 2 Test',
            ownerId: ownerId
        }
        await todoListModel.createTodoList(todoList);

        // Act
        const resp = await chai.request(app)
        .get('/todoList/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();

        // Assert
        expect(resp).to.be.json;
        expect(resp).to.have.status(200);
        expect(resp.body).length(2);
        (resp.body).forEach(todoList => expect(todoList).to.have.all.keys(['_id', 'ownerId', 'title']));

    });

    it('Should create and return the todo list', async function() {
        // Arrange
        let title = 'Todolist 2 Test';
        let ownerId = this.test.adminId;

        // Act
        const resp = await chai.request(app)
        .post('/todoList/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', 'application/json')
        .send({
            title: title,
            ownerId: ownerId
        });
        
        // Assert
        expect(resp).to.be.json;
        expect(resp).to.have.status(201);
        expect(resp.body).to.have.all.keys(['_id', 'ownerId', 'title']);
    });

    it('Should update a todo list and return the value one', async function() {
        // Arrange
        let title = 'Todolist 2 Test';
        let ownerId = this.test.adminId;
        let newTodoList = await todoListModel.createTodoList({title: title, ownerId: ownerId});
        let todoListId = newTodoList._id
        // Act
        const resp = await chai.request(app)
        .patch(`/todoList/${todoListId}`)
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', 'application/json')
        .send({
            title: 'Updated todolist title',
            ownerId: ownerId
        });
        // Assert
        assert.deepEqual(1, resp.body)
        expect(resp).to.be.json;
        expect(resp).to.have.status(201);
    });

    it('Should delete a todo list', async function() {
        // Arrange
        let title = 'Todolist 2 Test';
        let ownerId = this.test.adminId;
        let newTodoList = await todoListModel.createTodoList({title: title, ownerId: ownerId});
        let todoListId = newTodoList._id

        // Act
        const resp = await chai.request(app)
        .delete(`/todoList/${todoListId}`)
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();

        // Assert
        assert.deepEqual(1, resp.body)
        expect(resp).to.be.json;
        expect(resp).to.have.status(200);
    });
});