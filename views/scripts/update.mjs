async function editTodoItem( todoItemID ) {
    console.log(todoItemID);
    let todoItemElement = document.querySelector('div#' + todoItemID);
    let todoTitle = todoItemElement.querySelector('.todoTitle').value;
    let todoCompleted = todoItemElement.querySelector('.completed-checkbox').checked;
    
    const todoItem = {
        title: todoTitle,
        completed: todoCompleted
    };
    await fetch( 'http://localhost:8080/todos/' + todoItemID, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify(todoItem)
    })
    .then( response => response.json() )
    .then(todoItem => {
        let editResponse = document.createElement('span');
        editResponse.classList.add('edit-response');
        if(todoItem == 1) {
            todoItemElement.append(editResponse);
            editResponse.innerText = "Item has been updated";
            setTimeout( () => {
                editResponse.innerText = '';
            }, 2000);
        } else {
            todoItemElement.append(editResponse);
            editResponse.innerText = "Item hasn't been updated";
            setTimeout( () => {
                editResponse.innerText = '';
            }, 2000);
        }
    })
}
export {editTodoItem};
