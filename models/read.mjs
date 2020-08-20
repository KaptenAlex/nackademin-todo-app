import dataStore from 'nedb';
let todoDatabase = new dataStore({ filename: '../models/database.db', autoload: true });

function loadAllTodoItems() {
    return new Promise( (resolve, reject) => {
        todoDatabase.find({}, (err, allTodoItems) => {
            if (err) {
                reject(err)
            } else {
                resolve(allTodoItems)
            }
        });
    });
}

export {loadAllTodoItems};