import dataStore from 'nedb';
let todoDatabase = new dataStore({ filename: 'database', autoload: true });

function createTodoItem(todoItem) {
    return new Promise( (resolve, reject) => {
        todoDatabase.insert(todoItem, async(err, newTodoItem) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(newTodoItem);
                }
           });
    });
}
export {createTodoItem};