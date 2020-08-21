import {todoDatabase} from './databaseConnection.mjs';

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