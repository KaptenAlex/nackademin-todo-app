const jwt = require('jsonwebtoken');
const userModel = require('../models/users.js');
const secret = "f8a466e19a3140ae4545a9e3d8684368";

module.exports = {
    async authorize(req, res, next) {
        if(!req.headers.authorization) return res.sendStatus(401)
        const token = req.headers.authorization.replace("Bearer ", "");
        try {
            const payload = await jwt.verify(token, secret);
            req.user = payload;
            next();
        } catch (error) {
            res.sendStatus(401);
        }
    },
    async login(req, res) {
        try {
        const user = await userModel.loginUser(req.body.username, req.body.password);
        const token = await jwt.sign({username: user.username, role: user.role, id: user._id}, secret, {expiresIn: "12h"})
        res.json(token);
        } catch(err) {
          res.sendStatus(401)
        }
      }
}