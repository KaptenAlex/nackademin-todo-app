let signInBtn = document.getElementById('sign-in');
let signOutBtn = document.getElementById('sign-out');
let createAccountBtn = document.getElementById('create-user');

signInBtn.addEventListener('click', () => signIn() );
signOutBtn.addEventListener('click', () => signOut() );

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
