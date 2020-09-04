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