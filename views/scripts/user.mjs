let signInBtn = document.getElementById('sign-in');
let signOutBtn = document.getElementById('sign-out');
let createAccountBtn = document.getElementById('create-user');
let createAccountResponse = document.getElementById('create-account-response');

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
    await fetch('http://localhost:8080/users/signinUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginDetails)
    }).then(response => response.json() )
    .then(dataFromSignIn => {
        window.sessionStorage.setItem('token', dataFromSignIn);
    });

    await fetch('http://localhost:8080/users/authorizeUser', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
        }
    })
    .then( response => response.json() )
    .then(dataFromAuth => {
        window.sessionStorage.setItem('username', dataFromAuth.username);
        window.sessionStorage.setItem('role', dataFromAuth.role);

        let signedInUser = document.getElementById('account-username');
        signedInUser.innerHTML = 'Logged in as: ' + window.sessionStorage.getItem('username') + '<br>' + 'Role: ' + window.sessionStorage.getItem('role');

        usernameInput.value = '';
        passwordInput.value = '';

        let signedOutBtn = document.getElementById('sign-out');
        signedOutBtn.disabled = false;

        if(window.sessionStorage.getItem('role') == 'admin') {
            createAccountBtn.disabled = false;
        }
    });
}

function signOut() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('role');

    let signedInUser = document.getElementById('account-username');

    createAccountBtn.disabled = true;
    signOutBtn.disabled = true;

    signedInUser.innerHTML = '';
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

    await fetch('http://localhost:8080/users/createUser', {
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
        setTimeout( () => {
            createAccountResponse.innerHTML = '';
        }, 3500)
    });
}
