const nedb = require('nedb');
let dataStore = new nedb({ filename: './models/database.db', autoload: true });
//'../models/database.db'
module.exports = dataStore;