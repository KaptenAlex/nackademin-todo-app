fetch('http://localhost:8080/loadAllTodoItems')
.then(response => response.json())
.then(data => {
    data.forEach(todoItem => {
        let todoListElement = document.getElementById('todoList');
        let divElement = document.createElement('div');
        divElement.classList.add('todoItem');
        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        divElement.innerHTML = '<h2>'+ todoItem.title +'</h2><p>'+ todoItem.content +'</p>' + '<br/>' + '<button';
        todoListElement.appendChild(divElement);
        //document.body.appendChild(divElement);
    });

});