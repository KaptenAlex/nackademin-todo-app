import {loadAllTodoItems} from './read.mjs';

let createTodoButton = document.getElementById('create-todo-btn');
createTodoButton.addEventListener('click', () => createNewTodoItem());

async function createNewTodoItem() {
    let todoTitle = document.getElementById('newTodo-title');
    
    const newTodoItem = {
        title: todoTitle.value,
        completed: false
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
            todoTitle.value = '';
            loadAllTodoItems();
        }
    })
    
}