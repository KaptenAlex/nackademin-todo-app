import {loadAllTodoItems} from './read.mjs';

async function deleteTodoItem( todoItemID ) { 
    await fetch( 'http://localhost:8080/deleteTodoItem/' + todoItemID, {
        method: "DELETE"
    })
    .then( response => response.json() )
    .then( result => {
        console.log(result);
        if(result == 1) {
            loadAllTodoItems();
        } else {
            console.log("Item hasn't been deleted", result);
        }
    })
}

export {deleteTodoItem};