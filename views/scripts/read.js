fetch('http://localhost:8080/loadAllTodoItems')
.then(response => response.json())
.then(data => {
    data.forEach(todoItem => {
        // Todolist
        let todoListElement = document.getElementById('todoList');

        //Todo item
        let todoItemElement = document.createElement('div');
        todoItemElement.classList.add('todoItem');

        //Todo item's title
        let todoItemTitleElement = document.createElement('p');
        todoItemTitleElement.innerText = "Title";

        let todoItemTitleInputElement = document.createElement('input');
        todoItemTitleInputElement.value = todoItem.title;

        //Todo item's content
        let todoItemContentElement = document.createElement('p');
        todoItemContentElement.innerText = "Content";

        let todoItemContentInputElement = document.createElement('input');
        todoItemContentInputElement.value = todoItem.content;

        //Todo item's edit button
        let editButton = document.createElement('button');
        editButton.classList.add('editTodoItem');
        editButton.innerText = 'Edit todo item';
        
        //Todo item's delete button
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteTodoItem');
        deleteButton.innerText = 'Delete todo item';
        
        todoListElement.appendChild(todoItemElement);

        todoItemElement.appendChild(todoItemTitleElement);
        todoItemElement.appendChild(todoItemTitleInputElement);

        todoItemElement.appendChild(todoItemContentElement);
        todoItemElement.appendChild(todoItemContentInputElement);

        todoItemElement.appendChild(editButton);
        todoItemElement.appendChild(deleteButton);
    });

});