import {todoDatabase} from './databaseConnection.mjs';

function deleteTodoItem(todoItemID) {
    return new Promise( (resolve, reject) => {
        todoDatabase.remove({_id: todoItemID}, {}, (err, numOfTodoItemRemoved) => {
            if (err) {
                reject(err);
            } else {
                resolve(numOfTodoItemRemoved);
            }
        });
    });
}

export {deleteTodoItem};