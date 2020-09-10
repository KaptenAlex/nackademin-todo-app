const {usersDatabase} = require('./databaseConnection.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "f8a466e19a3140ae4545a9e3d8684368";

module.exports = {
    async createAccount(username, oldPassword, role) {
        return new Promise ( (resolve, reject) => {
            usersDatabase.findOne({username: username}, (err, userObject) => {
                if (err) {
                    reject(err);
                } else {
                    if(userObject === null) {
                        let salt = bcryptjs.genSaltSync(10);
                        let password = bcryptjs.hashSync(oldPassword, salt);
                        usersDatabase.insert({username, password, role}, (err, newUser) => {
                            if (err) {
                                reject({ error: err, message: "User was not created, try again", status: false })
                            } else {
                                resolve({ message: "User has been created", status: true })
                            }
                        })
                    } else {
                        resolve({ message: "Username already exists", status: false })
                    }
                }
            })
        });
    },
    async loginUser(username, password) {
        return new Promise( (resolve, reject) => {
            if(username === null || password === null || username.length == 0 || password.length == 0) {
                resolve({status: false, message: "Must provide username and password"});
            }
            usersDatabase.findOne({username: username}, (err, userObject) => {
                if (err) {
                    reject(err);
                } else if (userObject === null) {
                    resolve({status: false, message: "User does not exist"});
                } else {
                    const passwordComparison = bcryptjs.compareSync(password, userObject.password)
                    if (passwordComparison) {
                        const token = jwt.sign({username: userObject.username, role: userObject.role, id: userObject._id}, secret, {expiresIn: "7d"})
                        resolve(token);
                    } else {
                        resolve({status:false, message: "Invalid password"});
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
    },
    async getUser(username) {
        return new Promise( (resolve, reject) => {
            usersDatabase.findOne({username: username}).projection({password: 0}).exec((err, usersObject) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(usersObject);
                }
            })
        })
    },
    async removeUser(id) {
        return new Promise( (resolve, reject) => {
            usersDatabase.remove({_id: id}, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    },
    async clearDatabase() {
        return new Promise( (resolve, reject) => {
            usersDatabase.remove({}, {multi: true}, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }
}