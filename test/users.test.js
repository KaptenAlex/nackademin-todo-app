const usersModel = require('../models/users.js');
const chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');
const users = require('../models/users.js');

chai.should();
chai.use(chaiAsPromised);

describe('Users model', async function() {
    beforeEach('Clear users test DB and add two users', async function() {
        await usersModel.clearDatabase();

        await usersModel.createAccount('kalle', '123', 'user');
        await usersModel.createAccount('alex', '123', 'admin');

        this.currentTest.secret = usersModel.secret;
    });

    it('Should create a account and return a object with a message and status', async function() {
        // Arrange
        let username, password, role;
        username = 'tester';
        password = '123';
        role = 'user';

        // Act
        let newAccount = await usersModel.createAccount(username, password, role);

        // Assert
        newAccount.should.be.an('object');
        newAccount.should.deep.equal({
            message: 'User has been created',
            status: true
        });


    });

    it('Should sign in a user and return a payload string', async function() {
        // Arrange
        let username, password, role;
        username = 'tester';
        password = '123';
        role = 'user';

        await usersModel.createAccount(username, password, role);

        // Act
        let signInAccount = await usersModel.loginUser(username, password);

        // Assert
        signInAccount.should.be.an('string');

    });
    
    it('Should return a array with three user objects', async function() {
        // Arrange
        let username, password, role;
        username = 'tester';
        password = '123';
        role = 'user';

        await usersModel.createAccount(username, password, role);

        // Act
        let getUsers = await usersModel.getUsers();

        // Assert
        getUsers.should.be.an('array').with.length(3);
        getUsers.forEach(user => expect(user).to.all.have.keys(['_id', 'username', 'role']) );
    });
    
    it('Should return a user object', async function() {
        // Arrange
        let username, password, role;
        username = 'tester';
        password = '123';
        role = 'user';

        await usersModel.createAccount(username, password, role);

        // Act
        let getUser = await usersModel.getUser(username);

        // Assert
        getUser.should.be.an('object');
        getUser.should.be.deep.equal({
            username: username,
            role: role,
            _id: getUser._id
        });
    });

    it('Should remove a user and return the number one', async function() {
        // Arrange
        let username, password, role;
        username = 'tester';
        password = '123';
        role = 'user';

        await usersModel.createAccount(username, password, role);
        let getUser = await usersModel.getUser(username);

        // Act
        let deletedUser = await usersModel.removeUser(getUser._id);

        // Assert
        deletedUser.should.be.an('number');
        deletedUser.should.equal(1);
    });

    it('Should clear the entire users test database and return the number three', async function() {
        // Arrange
        let username, password, role;
        username = 'tester';
        password = '123';
        role = 'user';

        await usersModel.createAccount(username, password, role);
        // Act
        let clearUsersTestDB = await usersModel.clearDatabase();

        // Assert
        clearUsersTestDB.should.be.an('number');
        clearUsersTestDB.should.equal(3);
    });
})