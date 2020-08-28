const {usersDatabase} = require('./databaseConnection.js');
const bcryptjs = require('bcryptjs');

module.exports = {
    async createAccount(username, oldPassword, role) {
        return new Promise ( (resolve, reject) => {
            let salt = bcryptjs.genSaltSync(10);
            let password = bcryptjs.hashSync(oldPassword, salt);
                usersDatabase.insert({username, password, role}, (err, newUser) => {
                    if (err) {
                        reject({ error: err, message: "User was not created, try again", status: false })
                    } else {
                        resolve({ message: "User has been created", status: true })
                    }
                })
        });
    },
    async loginUser(username, password) {
        return new Promise( (resolve, reject) => {
            usersDatabase.findOne({username: username}, (err, userObject) => {
                if (err) {
                    reject(err);
                } else {
                    const passwordComparison = bcryptjs.compareSync(password, userObject.password)
                    if (passwordComparison) {
                        resolve(userObject);
                    } else {
                        reject({error: err, message: "Incorrect password"});
                    }
                }
            })
        })
    },
    async getUsers() {
        return new Promise( (resolve, reject) => {
            usersDatabase.find({}).projection({password: 0}).sort({username: 1}).exec((err, usersObject) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(usersObject);
                }
            })
        })
    }
}