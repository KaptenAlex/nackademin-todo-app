import {editTodoItem} from './update.mjs';
import {deleteTodoItem} from './delete.mjs';

loadAllTodoItems();
async function loadAllTodoItems(pageNumber = 0) {
    fetch('http://localhost:8080/todos/loadAllTodoItems/?page=' + pageNumber)
    .then(response => response.json())
    .then(data => {
        let todoListElement = document.getElementById('todoList');
        todoListElement.innerHTML = '';
        data.forEach(todoItem => {
            // Todolist
            let todoListElement = document.getElementById('todoList');
    
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
            //Todo: remove disabled edit and fix issue that edit has with new todo items
            editButton.disabled = true;
            editButton.addEventListener('click', () => editTodoItem(todoItem._id));
            
            //Todo item's delete button
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.id = todoItem._id;
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => deleteTodoItem(todoItem._id));
            
            //Append todoitem to todolist.
            todoListElement.appendChild(todoItemElement);
            todoItemElement.appendChild(todoItemCompletedInput);
            todoItemElement.appendChild(todoItemTitleInputElement);

            todoItemElement.appendChild(editButton);
            todoItemElement.appendChild(deleteButton);
            
        });
    
    });
}

export {loadAllTodoItems}