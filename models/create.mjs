import {todoDatabase} from './databaseConnection.mjs';

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