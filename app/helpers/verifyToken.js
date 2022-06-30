const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
    try {
        const tokenToVerify = req.headers.authorization;
        console.log('hearder authorization', tokenToVerify);
        if (!tokenToVerify) return res.status(403).send('No token provided');
        const [, token] = tokenToVerify.split(' ');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            console.log('err', err);
            console.log('jwt', decoded);
            if (err) {
                return res.status(401).json({ message: 'invalid token' });
            }
            req.user = decoded.user;
            return next();
        });
    } catch (error) {
        res.status(403).send('Invalid token');
    }
};
