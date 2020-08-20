import dataStore from 'nedb';
let todoDatabase = new dataStore({ filename: '../models/database.db', autoload: true });

function updateTodoItem(todoItem, todoItemID) {
    return new Promise( (resolve, reject) => {
        todoDatabase.update({_id: todoItemID}, todoItem, (err, updatedTodoItem) => {
            if (err) {
                reject(err);
            } else {
                resolve(updatedTodoItem);
            }
        });
    });
}

export {updateTodoItem};