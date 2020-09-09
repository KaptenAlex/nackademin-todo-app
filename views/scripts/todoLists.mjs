async function loadAllTodoLists() {
    fetch('http://localhost:8080/todoList/', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(todoLists => {
        let todoListDiv = document.getElementById('todoLists');
        todoLists.forEach(todoList => {
            let todoListItemElement = document.createElement('div');
            todoListItemElement.classList.add('todoLists-item');

            let titleElement = document.createElement('h3');
            titleElement.innerText = todoList.title;
            titleElement.classList.add('todo-lists-title');

            let ownerIdElement = document.createElement('p');
            ownerIdElement.innerText = todoList.ownerId;
            ownerIdElement.classList.add('todo-lists-ownerid');

            let todoListButton = document.createElement('button');
            todoListButton.id = todoList._id;
            todoListButton.innerText = `Go to ${todoList.title}`;
            todoListButton.classList.add('todo-lists-ownerid');

            todoListDiv.appendChild(todoListItemElement);
            todoListItemElement.appendChild(titleElement);
            todoListItemElement.appendChild(ownerIdElement);
            todoListItemElement.appendChild(todoListButton);
        });
    });
}


export { loadAllTodoLists };
