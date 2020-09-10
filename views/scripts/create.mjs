import {loadAllTodoItems, todoListID} from './read.mjs';

let createTodoButton = document.getElementById('create-todo-btn');
createTodoButton.addEventListener('click', () => createNewTodoItem());

async function createNewTodoItem() {
    let newTodoTitle = document.getElementById('newTodo-title');
    
    const newTodoItem = {
        title: newTodoTitle.value,
        completed: false,
        todoListId: todoListID
    };
    await fetch( 'http://localhost:8080/todos/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify(newTodoItem)
    })
    .then( response => response.json() )
    .then(todoItem => {
        if (!todoItem) {
            console.log('Something went wrong, shake student to get answers');
        } else {
            newTodoTitle.value = '';
            loadAllTodoItems(0, todoListID);
        }
    })
    
}