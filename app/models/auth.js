const bcrypt = require('bcrypt');
const client = require('../config/db');
/**
 * @typedef {object} Login
 * @property {string} email - email de l'utilisateur
 * @property {string} password - mot de passe de
 */
/**
 * @typedef {object} InputUserLogin
 * @property {string} email - email de l'utilisateur
 * @property {string} password - mot de passe de l'utilisateur
 */

module.exports = {
    /**
     * Récupére tout sans filtre ni ordre
     * @param {InputUserLogin} user
     * @returns user
     */
    async checkAuth(user) {
        // je récupère l'user grâce à son email
        const result = await client.query(
            'SELECT * FROM user_account WHERE email = $1',
            // eslint-disable-next-line comma-dangle
            [user.email]
        );
        // je compare le mot de passe en dur fourni par l'utilisateur dans le formulaire de connexion avec le mot de passe hashé dans notre BDD
        const passwordVerify = await bcrypt.compare(
            user.password,
            result.rows[0].password
        );
        // sI L'User n'est pas dans notre BDD je lève une erreur
        if (result.rows[0]) {
            if (passwordVerify === false) {
                throw new Error('Authentication invalid');
            }
            return result.rows[0];
        }
        return false;
    },
};
