import dataStore from 'nedb';
let todoDatabase = new dataStore({ filename: '../models/database.db', autoload: true });

export {todoDatabase};