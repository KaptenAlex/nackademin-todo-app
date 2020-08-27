const nedb = require('nedb');
let postsDatabase = new nedb({ filename: './models/database.db', autoload: true });
let usersDatabase = new nedb({ filename: './models/users.db', autoload: true });
module.exports = {postsDatabase, usersDatabase};