require('dotenv').config();
const nedb = require('nedb');

let postsDatabase, usersDatabase;
switch (process.env.ENVIROMENT) {
    case 'development':
        postsDatabase = new nedb({ filename: './models/database.db', autoload: true });
        usersDatabase = new nedb({ filename: './models/users.db', autoload: true });
        break;
    case 'test':
        postsDatabase = new nedb({ filename: './test/todosTest.db', autoload: true });
        usersDatabase = new nedb({ filename: './test/usersTest.db', autoload: true });
        postsDatabase.remove({}, {multi: true});
        usersDatabase.remove({}, {multi: true});
        break;
}

module.exports = {
    postsDatabase,
    usersDatabase
};