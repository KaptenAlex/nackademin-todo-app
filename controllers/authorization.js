require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    async authorize(req, res, next) {
        if(!req.headers.authorization) return res.sendStatus(401)
        const token = req.headers.authorization.replace("Bearer ", "");
        try {
            const payload = jwt.verify(token, process.env.SECRET);
            req.user = payload;
            next();
        } catch (error) {
            res.sendStatus(401);
        }
    }
}