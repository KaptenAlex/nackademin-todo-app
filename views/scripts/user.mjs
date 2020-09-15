import { loadAllTodoLists } from './todoLists.mjs';

let signInBtn = document.getElementById('sign-in');
let signOutBtn = document.getElementById('sign-out');
let createAccountBtn = document.getElementById('create-user');
let createAccountResponse = document.getElementById('create-account-response');
let userInterface = document.getElementById('signed-in-interface');
let usernameInput = document.getElementById('username-sign-in');
let passwordInput = document.getElementById('password-sign-in');

signInBtn.addEventListener('click', () => signIn() );
signOutBtn.addEventListener('click', () => signOut() );
createAccountBtn.addEventListener('click', () => createAccount() ) 

async function signIn() {
    let userLoginDetails = {
        username: usernameInput.value,
        password: passwordInput.value
    }
    await fetch('http://localhost:8080/users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginDetails)
    }).then(response => response.json() )
    .then(dataFromSignIn => {
        if (dataFromSignIn.status == false) {
            let signInResponseElement = document.getElementById('sign-in-response');
            signInResponseElement.innerText = dataFromSignIn.message;
            setTimeout( () => {
                signInResponseElement.innerHTML = '';
            }, 3500);
        } else {
            window.sessionStorage.setItem('token', dataFromSignIn);
            authorizeUser();
        }
    });
}

async function authorizeUser() {
    await fetch('http://localhost:8080/users/authorize', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then( response => response.json() )
    .then(dataFromAuth => {
        window.sessionStorage.setItem('username', dataFromAuth.username);
        window.sessionStorage.setItem('role', dataFromAuth.role);
        window.sessionStorage.setItem('id', dataFromAuth.id);

        let signedInUser = document.getElementById('account-username');
        signedInUser.innerHTML = 'Logged in as: ' + window.sessionStorage.getItem('username') + '<br>' + 'Role: ' + window.sessionStorage.getItem('role') + '<br>' + 'id: '
        + window.sessionStorage.getItem('id');

        usernameInput.value = '';
        passwordInput.value = '';

        let signedOutBtn = document.getElementById('sign-out');
        signedOutBtn.disabled = false;
        signInBtn.disabled = true;
    });
    if(window.sessionStorage.getItem('role') == 'admin') { 
        getAllUsers();
    }
    if(window.sessionStorage.getItem('role') == 'user') {
        let gdprBtn = document.createElement('button');
        gdprBtn.innerText = 'Privacy and Cookie policy';
        gdprBtn.addEventListener('click', () => createGDPRWindow());
        let signedInDiv = document.getElementById('signed-in-interface');
        signedInDiv.appendChild(gdprBtn);
    }
    loadAllTodoLists();
}

async function getAllUsers() {
    //Activate create an account button.
    createAccountBtn.disabled = false;

    //For creating elements for deleting users.
    let deleteUsersDiv = document.createElement('div');
    deleteUsersDiv.id = "delete-users-element";
    userInterface.append(deleteUsersDiv);
    let deleteUsersLabel = document.createElement('p');
    deleteUsersLabel.innerText = 'Delete user';
    deleteUsersDiv.append(deleteUsersLabel);
    let usersSelectBox = document.createElement('select');
    usersSelectBox.id = 'delete-user-select';
    deleteUsersDiv.append(usersSelectBox);
    let deleteUsersResponse = document.createElement('p');
    deleteUsersResponse.id = 'delete-user-response';
    deleteUsersDiv.append(deleteUsersResponse);
    let deleteUserBtn = document.createElement('button');
    deleteUserBtn.id = 'delete-user';
    deleteUserBtn.innerText = 'Delete selected user';
    deleteUserBtn.addEventListener('click', () => deleteUser() ) 
    deleteUsersDiv.append(deleteUserBtn);

    await fetch('http://localhost:8080/users/', {
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(users => {
        let usersSelectBox = document.getElementById('delete-user-select');
        users.forEach(user => {
            let userOption = document.createElement('option');
            userOption.value = user._id;
            userOption.innerText = user.username + ' | ' + user.role;
            usersSelectBox.appendChild(userOption);
        });
    })
}

function signOut() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('role');
    window.sessionStorage.removeItem('id');

    let signedInUser = document.getElementById('account-username');

    createAccountBtn.disabled = true;
    signOutBtn.disabled = true;
    signInBtn.disabled = false;
    document.getElementById('create-todo-btn').disabled = true;

    signedInUser.innerHTML = '';
    document.getElementById('todo-items-list').innerHTML = '';
    document.getElementById('todoLists').innerHTML = '';

    if (document.getElementById('delete-users-element')) {
        document.getElementById('delete-users-element').remove();
    }
}

async function createAccount() {
    let createUsernameInput = document.getElementById('create-user-username');
    let createPasswordInput = document.getElementById('create-user-password');
    let createRoleInput = document.getElementById('create-user-role');

    let newUser = {
        username: createUsernameInput.value,
        password: createPasswordInput.value,
        role: createRoleInput.value
    };

    await fetch('http://localhost:8080/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json() )
    .then(dataFromCreation => {
        createUsernameInput.value = '';
        createPasswordInput.value = '';
        createAccountResponse.innerHTML = dataFromCreation;
        document.getElementById('delete-users-element').remove();
        getAllUsers();
        setTimeout( () => {
            createAccountResponse.innerHTML = '';
        }, 3500)
    });
}

async function deleteUser() {
    let usersSelectBox = document.getElementById('delete-user-select');

    await fetch('http://localhost:8080/users/' + usersSelectBox.value, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then(response => response.json() )
    .then(data => {
        document.getElementById('delete-users-element').innerHTML = '';

        getAllUsers();
        
        let deleteUserResponse = document.getElementById('delete-user-response');
        deleteUserResponse.innerText = data;

        //For removing the message from delete user
        setTimeout( () => {
            deleteUserResponse.innerHTML = '';
        }, 3500);
    });
}

async function createGDPRWindow() {
    let gdprDiv = document.getElementById('gdpr')
    let createGDPRControlDiv = document.createElement('div');
    createGDPRControlDiv.id = 'gdpr-controls';
    gdprDiv.appendChild(createGDPRControlDiv);
    
    let getAllDataGDPRBtn = document.createElement('button');
    getAllDataGDPRBtn.innerText = 'Get all data related to me';
    getAllDataGDPRBtn.id = 'get-user-data';
    getAllDataGDPRBtn.addEventListener('click', () => getAllUserDataGDPR());

    let removeAllDataGDPRBtn = document.createElement('button');
    removeAllDataGDPRBtn.id = 'remove-all-user-data';
    removeAllDataGDPRBtn.innerText = 'Remove all data related to me and my account';
    removeAllDataGDPRBtn.disabled = true;
    removeAllDataGDPRBtn.addEventListener('click', () => removeAllUserDataGDPR());
    
    createGDPRControlDiv.appendChild(getAllDataGDPRBtn);
    createGDPRControlDiv.appendChild(removeAllDataGDPRBtn);
}

async function getAllUserDataGDPR() {
    let gdprDiv = document.getElementById('gdpr')

    await fetch('http://localhost:8080/users/user/gdpr/getUserData', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(userData => {
        let gdprUserData = document.createElement('div');
        gdprUserData.id = 'user-data';
        gdprUserData.classList.add('user-data');
        gdprDiv.appendChild(gdprUserData);

        let userObject = document.createElement('div');
        userObject.innerHTML = '<h2>Your user data</h2>' +
         `<p>Username: ${userData.user.username}</p>` +
         `<p>Role: ${userData.user.role}</p>` +
         `<p>ID: ${userData.user._id}</p>`;
        gdprUserData.appendChild(userObject);

        let todoListObject = document.createElement('div');
        todoListObject.innerHTML = '<h2>Your todo lists</h2>';
        todoListObject.classList.add('users-todolists');
        
        userData.todoLists.forEach(todoList => {
            let todoListDiv = document.createElement('div');
            todoListDiv.innerHTML += '<h4>Todo list</h4>' + 
            `<p> Title: ${todoList.title}<p/>` +
            `<p> Owner id: ${todoList.ownerId}<p/>` +
            `<p> ID: ${todoList._id}<p/>` ;
            todoListObject.appendChild(todoListDiv);
        });
        gdprUserData.appendChild(todoListObject);


        let todoItemObject = document.createElement('div');
        todoItemObject.innerHTML = '<h2>Your todo items</h2>';
        todoItemObject.classList.add('users-todoitems')

        userData.todoItems.forEach(todoItems => {
            let todoItemDiv = document.createElement('div');
            todoItemDiv.innerHTML += '<h4>Todoitem</h4>' + 
            `<p>Title: ${todoItems.title}</p>` +
            `<p>Completed: ${todoItems.completed}</p>` +
            `<p>Created: ${todoItems.created}</p>` +
            `<p>Updated: ${todoItems.updated}</p>` +
            `<p>User ID: ${todoItems.userId}</p>` +
            `<p>Todolist ID: ${todoItems.todoListId}</p>` +
            `<p>Todoitem ID: ${todoItems._id}</p>`;
            todoItemObject.appendChild(todoItemDiv);
        });
        gdprUserData.appendChild(todoItemObject);

        let removeAllDataGDPRBtn = document.getElementById('remove-all-user-data');
        removeAllDataGDPRBtn.disabled = false;
        document.getElementById('get-user-data').disabled = true;
    });
}

async function removeAllUserDataGDPR() {
    if(confirm('This action is irreversible and cannot be regretted later, are you sure you want to delete all data about you?')) {
        await fetch('http://localhost:8080/users/user/gdpr/removeUserData', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            }
        })
        .then(response => response.json() )
        .then(data => {
            document.getElementById('user-data').remove();
            document.getElementById('gdpr-controls').remove();

            document.getElementById('todoLists').innerHTML = '';
            document.getElementById('todo-items-list').innerHTML = '';

            signOut();

            alert(data.message)
        });
    } else {
        alert('You have cancelled the request to delete all data related to you.')
    }
}

async function returnToSignedInInterface() {

}