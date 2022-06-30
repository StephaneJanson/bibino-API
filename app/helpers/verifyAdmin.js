const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
    try {
        const tokenToVerify = req.headers.authorization;
        if (!tokenToVerify) return res.status(403).send('No token provided');
        const [, token] = tokenToVerify.split(' ');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'invalid token' });
            }
            req.user = decoded.user;
            const userRole = req.user.role_id;
            if (userRole !== 2) {
                return res
                    .status(403)
                    .json({ message: 'Reserved for administrators' });
            }
            return next();
        });
    } catch (error) {
        res.status(403).send('Invalid token');
    }
};
