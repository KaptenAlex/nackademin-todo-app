import {loadAllTodoItems} from './read.mjs';

let createTodoButton = document.getElementById('create-todo-btn');
createTodoButton.addEventListener('click', () => createNewTodoItem());

async function createNewTodoItem() {
    let todoTitle = document.getElementById('newTodo-title').value;
    
    const newTodoItem = {
        title: todoTitle,
        completed: false
    };
    await fetch( 'http://localhost:8080/createTodoItem', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newTodoItem)
    })
    .then( response => response.json() )
    
    .then(todoItem => {
        if (!todoItem) {
            console.log('Something went wrong, shake programmer to get answers');
        } else {
            loadAllTodoItems();
        }
    })
    
}