const {usersDatabase} = require('./databaseConnection.js');
const bcryptjs = require('bcryptjs');

module.exports = {
    async createAccount(username, password, role) {
        return new Promise ( (resolve, reject) => {
            let salt = bcryptjs.genSaltSync(10);
            let hash = bcryptjs.hashSync(password, salt);
            if(role != "admin" && role != "user") {
                reject({error: "User was not created, try again", reason: "Role was invalid"}) 
            } else {
                usersDatabase.insert({username, hash, role}, (err, newUser) => {
                    if (err) {
                        reject({ error: err, message: "User was not created, try again", status: false })
                    } else {
                        resolve({ message: "User has been created", status: true })
                    }
                })
            }
        });
    }
}