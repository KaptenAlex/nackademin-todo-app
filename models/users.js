require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
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
    async loginUser(username, password) {
        try {
            // Todo: do this in schema
            if(username === null || password === null || username.length == 0 || password.length == 0) {
                return {message: "Must provide username and password", status: false};
            }

            let user = await User.findOne({username: username});
            const passwordComparison = bcryptjs.compareSync(password, user.password);
    
            if (passwordComparison) {
                const token = jwt.sign({username: user.username, role: user.role, id: user._id}, process.env.SECRET, {expiresIn: "7d"});
                return token;
            } else {
                return { message: "Invalid password", status: false };
            }
               
        } catch (error) {
            return {message: "User was not signed in, try again", status: false};
        }
    },
    async clearDatabase() {
        try {
            return (await User.deleteMany({})).deletedCount;
        } catch (error) {
            return {message: "User DB has not been cleared", status: false};
        }
    },
    async getUsers() {
        try {
            let users = await User.find({}, 'username role' );
            return users;
        } catch (error) {
            return {message: "Could not get users, try again", status: false};
        }
    },
    async getUser(username) {
        try {
            let user = await User.findOne({username: username}, 'username role' );
            return user;
        } catch (error) {
            return {message: "Could not get user, try again", status: false};
        }
    },
    async removeUser(id) {
        try {
            let user = (await User.deleteOne({_id: id})).deletedCount;
            return user;
        } catch (error) {
            return {message: "Could not remove user, try again", status: false};
        }
    }
}