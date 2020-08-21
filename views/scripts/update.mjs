import {loadAllTodoItems} from './read.mjs';

async function editTodoItem( todoItemID ) {
    let todoItemElement = document.querySelector('div#' + todoItemID);
    let todoTitle = todoItemElement.querySelector('.todoTitle').value;
    let todoCompleted = todoItemElement.querySelector('.completed-checkbox').checked;
    
    const todoItem = {
        title: todoTitle,
        completed: todoCompleted
    };
    await fetch( 'http://localhost:8080/updateTodoItem/' + todoItemID, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(todoItem)
    })
    .then( response => response.json() )
    .then(todoItem => {
        if(todoItem == 1) {
            console.log("Item has been updated", todoItem);
        } else {
            console.log("Item hasn't been updated", todoItem);
        }
    })
}
export {editTodoItem};
