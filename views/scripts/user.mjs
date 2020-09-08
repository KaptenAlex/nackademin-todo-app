import { loadAllTodoItems } from './read.mjs';

let signInBtn = document.getElementById('sign-in');
let signOutBtn = document.getElementById('sign-out');
let createAccountBtn = document.getElementById('create-user');
let createAccountResponse = document.getElementById('create-account-response');
let userInterface = document.getElementById('signed-in-interface');

signInBtn.addEventListener('click', () => signIn() );
signOutBtn.addEventListener('click', () => signOut() );
createAccountBtn.addEventListener('click', () => createAccount() ) 

async function signIn() {
    let usernameInput = document.getElementById('username-sign-in');
    let passwordInput = document.getElementById('password-sign-in');

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
        window.sessionStorage.setItem('token', dataFromSignIn);
    });

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
    });
    if(window.sessionStorage.getItem('role') == 'admin') { 
        getAllUsers();
     }
    loadAllTodoItems();
}

async function getAllUsers() {
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
    
    // After appending everything for deleting a user, load all users.
    // getAllUsers();

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

    let signedInUser = document.getElementById('account-username');

    createAccountBtn.disabled = true;
    signOutBtn.disabled = true;
    signedInUser.innerHTML = '';

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
        let deleteUserResponse = document.getElementById('delete-user-response');
        deleteUserResponse.innerText = data;

        let deleteUsersSelect = document.getElementById('delete-user-select');
        deleteUsersSelect.innerHTML = '';

        getAllUsers();

        //For removing the message from delete user
        setTimeout( () => {
            deleteUserResponse.innerHTML = '';
        }, 3500);
    })
}
