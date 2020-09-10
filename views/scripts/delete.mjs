import {loadAllTodoItems, todoListID} from './read.mjs';

async function deleteTodoItem( todoItemID ) { 
    await fetch( 'http://localhost:8080/todos/' + todoItemID, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then( response => response.json() )
    .then( result => {
        if(result == 1) {
            loadAllTodoItems(0, todoListID);
        } else {
            console.log("Item hasn't been deleted", result);
        }
    })
}

export {deleteTodoItem};