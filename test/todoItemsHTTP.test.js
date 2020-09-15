const app = require('../app.js');
const todosModel = require('../models/todos.js');
const usersModel = require('../models/users.js');

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
            userId: 'Fredde',
            todoListId: '1'
        };
        for (let i = 0; i < 4; i++) {
            todoItem.title + i;
            await todosModel.createTodoItem(todoItem);
        }
        todoItem.userId = 'Alex';
        todoItem.todoListId = '2';
        for (let i = 0; i < 5; i++) {
            todoItem.title + i;
            if (i != 4) {
                await todosModel.createTodoItem(todoItem);
            } else {
                let createdTodoItem = await todosModel.createTodoItem(todoItem);
                this.currentTest.todoItemID = createdTodoItem._id; 
            }
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
        
        this.currentTest.token = await usersModel.loginUser(newUser.username, newUser.password);
    });
    //TODO: Add test where user has the role user
    it('Should get a 201 response with an array of eight of nine todo items', async function() {
        const resp = await chai.request(app)
        .get('/todos/todos/?page=0&todoListId=1')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(4);
        (resp.body).forEach(todoItem => expect(todoItem).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'todoListId', 'created', 'updated']));
    });

    it('Should get a 201 with an array with eight of the latest created todo items', async function() {
        const resp = await chai.request(app)
        .get('/todos/sort/created')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(8);
        (resp.body).forEach(todoItem => expect(todoItem).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'todoListId', 'created', 'updated']));
    });

    it('Should get a 201 with an array of eight of the latest updated todo items', async function() {
        const resp = await chai.request(app)
        .get('/todos/sort/updated')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(8);
        (resp.body).forEach(todoItem => expect(todoItem).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'todoListId', 'created', 'updated']));
    });

    it('Should get a 201 with a object of the newly created todo item', async function() {
        const resp = await chai.request(app)
        .post('/todos/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', 'application/json')
        .send({
            title: 'Newly created todo item: ',
            todoListId: 3
        });
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('object');
        expect(resp.body).to.have.all.keys(['_id', 'title', 'completed', 'userId', 'todoListId', 'created', 'updated']);
    });

    it('Should update a existing todo item with status code 201 and return a number with the value of one', async function() {
        const resp = await chai.request(app)
        .patch(`/todos/${this.test.todoItemID}`)
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-Type', 'application/json')
        .send({
            title: 'Updated todo item: ',
            completed: false
        });
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('number').equal(1);
    });

    it('Should delete a existing todo item with status code 201 and return a number with the value of one', async function() {
        const resp = await chai.request(app)
        .delete(`/todos/${this.test.todoItemID}`)
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('number').equal(1);
    });

    it('Should count the amount of pages needed for paginating all todo items in sets of eight', async function() {
        const resp = await chai.request(app)
        .get('/todos/countTodoItems/2')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('number').equal(1);
    });
    
    it('Should return a redirect status and a message telling that the client is being redirected', async function() {
        const resp = await chai.request(app)
        .get('/todos/')
        .redirects(0)
        .send();
        expect(resp).to.have.status(302);
        expect(resp.res.text).to.be.equal('Found. Redirecting to index.html');
    });
});