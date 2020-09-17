const Database = require('../models/databaseConnection.js');
const usersModel = require('../models/users.js');
const chai = require('chai');
let chaiAsPromised = require("chai-as-promised");
const { expect } = require('chai');

chai.should();
chai.use(chaiAsPromised);

describe('Users model', async function() {
    before('Connect to database', async function() {
        await Database.connect();
    });

    beforeEach('Clear users DB and add two users', async function() {
        await usersModel.clearDatabase();
        await usersModel.createAccount('kalle', '123', 'user');
        await usersModel.createAccount('alex', '123', 'admin');
        
        this.currentTest.secret = usersModel.secret;
    });
    
    after('Disconnect from database', async function() {
        await Database.disconnect();
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

    it('Should clear the entire users test database', async function() {
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
        getUsers.forEach(user => expect(user._doc).to.have.keys(['_id', 'username', 'role']) );
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
        getUser._doc.should.be.an('object');
        getUser._doc.should.have.keys({
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
        let getUserID = await usersModel.getUser(username);
        // Act
        let deletedUser = await usersModel.removeUser(getUserID._doc._id);

        // Assert
        deletedUser.should.be.an('number');
        deletedUser.should.equal(1);
    });
    
});