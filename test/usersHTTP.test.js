const app = require('../app.js');
const usersModel = require('../models/users.js');
const authorizationMiddleWare = require('../controllers/authorization.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
let chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Users integration tests', function() {
    beforeEach('Clear test DB and create two users with different roles, admin and user.', async function() {
        await usersModel.clearDatabase();

        let newUser = {
            username: "kalle",
            password: '123',
            role: 'user'
        };
        await usersModel.createAccount(newUser.username, newUser.password, newUser.role);
        let userAccount = await usersModel.getUser(newUser.username);
        this.currentTest.userId = userAccount._id;

        newUser.username = 'alex';
        newUser.role = 'admin';

        this.currentTest.admin = await usersModel.createAccount(newUser.username, newUser.password, newUser.role);
        this.currentTest.token = await usersModel.loginUser(newUser.username, newUser.password);
    });

    it('Should get a array with two user objects', async function() {
        const resp = await chai.request(app)
        .get('/users/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        
        expect(resp).to.have.status(200);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('array').with.length(2);
        (resp.body).forEach(user => expect(user).to.have.all.keys(['_id', 'username', 'role']));
    });

    it('Should get a string back confirming the user has been created', async function() {
        const resp = await chai.request(app)
        .post('/users/')
        .set('Authorization', `Bearer ${this.test.token}`)
        .set('Content-type', 'application/json')
        .send({
            username: 'test_user',
            password: '123',
            role: 'user'
        });
        
        expect(resp).to.have.status(201);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('string').equal('User has been created');
    });

    it('Should delete a user', async function() {
        const resp = await chai.request(app)
        .delete(`/users/${this.test.userId}`)
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        
        expect(resp).to.have.status(200);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('string').equal('User has been deleted');
    });

    it('Should sign in a account with user role with the help of username and password', async function() {
        const resp = await chai.request(app)
        .post('/users/signin')
        .send({
            username: 'kalle',
            password: '123'
        });
        expect(resp).to.have.status(200);
        expect(resp).to.be.json;
        expect(resp.body).to.be.an('string');
    });

    it('Should return a user object with username, role and id', async function() {
        const resp = await chai.request(app)
        .get('/users/authorize')
        .set('Authorization', `Bearer ${this.test.token}`)
        .send();
        expect(resp).to.have.status(200);
        expect(resp).to.be.json;
        expect(resp.body).to.have.all.keys(['id', 'username', 'role']);
    });
});