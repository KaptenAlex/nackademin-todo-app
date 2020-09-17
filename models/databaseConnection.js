const mongoose = require('mongoose')
require('dotenv').config()

let mongoDatabase

switch(process.env.ENVIRONMENT){
    case 'development':
    case 'test':
        const {MongoMemoryServer} = require('mongodb-memory-server')
        mongoDatabase = new MongoMemoryServer({ binary: {version: '4.4.1'} })
        break;
    case 'production':
    case 'staging':
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () => 
            //'mongodb+srv://localhost' 
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        break;
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
    if(process.env.ENVIRONMENT == 'test' || process.env.ENVIRONMENT == 'development'){
        await mongoDatabase.stop()
    }
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