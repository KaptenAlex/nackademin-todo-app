async function editTodoItem( todoItemID ) {
    let todoItemElement = document.querySelector('div#' + todoItemID);
    let todoTitle = todoItemElement.querySelector('.todoTitle').value;
    let todoCompleted = todoItemElement.querySelector('.completed-checkbox').checked;
    
    const todoItem = {
        title: todoTitle,
        completed: todoCompleted
    };
    await fetch( 'http://localhost:8080/todos/' + todoItemID, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify(todoItem)
    })
    .then( response => response.json() )
    .then(todoItem => {
        // TODO: Return answer to user instead of console log
        if(todoItem == 1) {
            console.log("Item has been updated", todoItem);
        } else {
            console.log("Item hasn't been updated", todoItem);
        }
    })
}
export {editTodoItem};
