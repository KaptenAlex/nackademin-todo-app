import {editTodoItem} from './update.mjs';
import {deleteTodoItem} from './delete.mjs';

document.getElementById('sort-by-created').addEventListener('click', () => sortByLatestCreated() );
document.getElementById('sort-by-updated').addEventListener('click', () => sortByLatestUpdated() );

async function sortByLatestCreated() {
    sortTodos('sort/created');
}

async function sortByLatestUpdated() {
    sortTodos('sort/updated');
}

function sortTodos (sortByEndpoint) {
    fetch('http://localhost:8080/todos/' + sortByEndpoint, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        let todo_item_listElement = document.getElementById('todo-items-list');
        todo_item_listElement.innerHTML = '';
        data.forEach(todoItem => {
            // Todolist
            let todo_item_listElement = document.getElementById('todo-items-list');
    
            //Todo item
            let todoItemElement = document.createElement('div');
            todoItemElement.classList.add('todoItem');
            todoItemElement.id = todoItem._id
    
            //Todo item's completed checkbox
            let todoItemCompletedInput = document.createElement('input');
            todoItemCompletedInput.type = "checkbox";
            todoItemCompletedInput.classList.add("completed-checkbox");
            if(todoItem.completed == false) {
                todoItemCompletedInput.checked = false;
            } else {
                todoItemCompletedInput.checked = true;
            }
    
            //Todo title input
            let todoItemTitleInputElement = document.createElement('input');
            todoItemTitleInputElement.value = todoItem.title;
            todoItemTitleInputElement.classList.add('todoTitle');

            //Todo item's edit button
            let editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.id = todoItem._id;
            editButton.innerText = 'Edit';
            editButton.addEventListener('click', () => editTodoItem(todoItem._id));
            
            //Todo item's delete button
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.id = todoItem._id;
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => deleteTodoItem(todoItem._id));
            
            //Append todoitem to todolist.
            todo_item_listElement.appendChild(todoItemElement);
            todoItemElement.appendChild(todoItemCompletedInput);
            todoItemElement.appendChild(todoItemTitleInputElement);

            todoItemElement.appendChild(editButton);
            todoItemElement.appendChild(deleteButton);
            
        });
    
    });
}