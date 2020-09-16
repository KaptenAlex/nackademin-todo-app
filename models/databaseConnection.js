const mongoose = require('mongoose');
require('dotenv').config();

let developmentDB, testDB;

switch (process.env.ENVIROMENT) {
    case 'development':
        const {MongoMemoryServer} = require('mongodb-memory-server');
        developmentDB = new MongoMemoryServer();
        break;
    case 'test':
        const {MongoMemoryServer} = require('mongodb-memory-server')
        testDB = new MongoMemoryServer();
        break;

        default:
            console.log("Running databaseconnection on default");
            break;
        /*
    case 'staging':
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => 
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        break;
    case 'production':
    
        break;
        */
}

async function connect(){
    
    let uri = await mongoDatabase.getUri()

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect(){
    await mongoDatabase.stop()
    await mongoose.disconnect()
}


module.exports = {
    connect, disconnect
}

/*
require('dotenv').config();
const nedb = require('nedb');

let todoItemDatabase, usersDatabase, todoListDatabase;
switch (process.env.ENVIROMENT) {
    case 'development':
        todoItemDatabase = new nedb({ filename: './models/todoItems.db', autoload: true });
        usersDatabase = new nedb({ filename: './models/users.db', autoload: true });
        todoListDatabase = new nedb({ filename: './models/todoList.db', autoload: true });
        break;
    case 'test':
        todoItemDatabase = new nedb({ filename: './test/todosTest.db', autoload: true });
        usersDatabase = new nedb({ filename: './test/usersTest.db', autoload: true });
        todoListDatabase = new nedb({ filename: './test/todoListTest.db', autoload: true });
        
        todoItemDatabase.remove({}, {multi: true});
        usersDatabase.remove({}, {multi: true});
        todoListDatabase.remove({}, {multi: true});
        break;
}

module.exports = {
    todoItemDatabase,
    usersDatabase,
    todoListDatabase
};
*/