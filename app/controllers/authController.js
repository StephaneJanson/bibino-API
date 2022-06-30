const jwt = require('jsonwebtoken');

const authDataMapper = require('../models/auth');

module.exports = {
    /**
     * Auth controller to login a user
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async login(req, res) {
        const user = await authDataMapper.checkAuth(req.body);

        if (!user) {
            return res.status(404).json('Authentication invalid');
        }

        const secret = process.env.JWT_SECRET || 'passphrase';

        const token = {
            token: jwt.sign({ user }, secret, {
                expiresIn: process.env.JWT_EXPIRES,
            }),
        };
        return res.json(token);
    },
    /**
     * Auth controller to logout a user
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async logout(req, res) {
        const verificationLogin = await authDataMapper.checkAuth(req.body);
        if (verificationLogin) {
            const options = {};

            options.expiresIn = 1;
            const secret = process.env.JWT_SECRET || 'passphrase';

            const response = {
                token: jwt.sign(verificationLogin, secret, options),
                expiresIn: options.expiresIn,
            };
            return res.json(response);
        }
        return res.status(404).json('You are not connected');
    },
};
