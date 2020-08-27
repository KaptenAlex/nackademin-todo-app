const jwt = require('jsonwebtoken');
const userModel = require('../models/todos.js');
const secret = "f8a466e19a3140ae4545a9e3d8684368";

module.exports = {
    async authorize(req, res, next) {
        if(!req.headers.authorization) return res.sendStatus(403)
        const token = req.headers.authorization.replace("Bearer ", "");
        try {
            const payload = await jwt.verify(token, secret);
            req.user = payload;
            next();
        } catch (error) {
            res.sendStatus(403);
        }
    },
    async login(req, res) {
        try{
        const user = {
          username: req.body.username,
          password: req.body.password
        }
        const login = await userModel.loginUser(user);
        const token = jwt.sign({username: login.username, role: login.role}, secret, {expiresIn: "1h"})
        res.json({token});
        }catch(err) {
          res.sendStatus(401)
        }
      }
}