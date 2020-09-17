require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongooseDB = require('./databaseConnection.js');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    role: String,
}, {versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = {
    async createAccount(username, oldPassword, role) {
        let password = bcryptjs.hashSync(oldPassword, 10);
        try {
            await User.create({username, password, role});
            return {message: "User has been created", status: true}
        } catch (error) {
            return {message: "User has not been created", status: false};
        }
    },
    async clearDatabase() {
        try {
            return (await User.deleteMany({})).deletedCount;
        } catch (error) {
            return error;
        }
    },
        /*
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
                        const token = jwt.sign({username: userObject.username, role: userObject.role, id: userObject._id}, process.env.SECRET, {expiresIn: "7d"})
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
    */
}