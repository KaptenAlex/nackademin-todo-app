import {todoDatabase} from './databaseConnection.mjs';

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