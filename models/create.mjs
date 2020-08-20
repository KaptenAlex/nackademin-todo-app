import dataStore from 'nedb';
let todoDatabase = new dataStore({ filename: '../models/database.db', autoload: true });

function createTodoItem(todoItem) {
    return new Promise( (resolve, reject) => {
        todoDatabase.insert(todoItem, (err, newTodoItem) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(newTodoItem);
                }
           });
    });
}
export {createTodoItem};