/* eslint-disable operator-linebreak */
const client = require('../config/db');
/**
 * @typedef {object} User
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} alias - Alias de l'utilisateur
 * @property {date} date_of_birth - date de naissance de l'utilisateur
 * @property {string} email - Email de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {number} role_id -Role id de l'utilisateur
 */
/**
 * @typedef {object} InputUser
 * @property {string} alias - Alias de l'utilisateur
 * @property {date} date_of_birth - date de naissance de l'utilisateur
 * @property {string} email -  Email de l'utilisateur
 * @property {string} password - Mot de passe de l'utilisateur
 * @property {string} confirmPassword - Mot de passe de l'utilisateur
 * @property {number} role_id -Role id de l'utilisateur
 */

module.exports = {
    /**
     * Récupére tout sans filtre ni ordre
     * @returns Tous les users dans la base de donnée
     */
    async findAll() {
        const result = await client.query(
            "SELECT user_account.id, user_account.alias, to_char(user_account.date_of_birth, 'dd/mm/yyyy') AS date_of_birth, user_account.email, user_account.password, role.name AS role, age(CURRENT_DATE,date(date_of_birth)) as age FROM user_account JOIN role ON role.id = user_account.role_id"
        );
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} userId - L'id de l'user souhaité
     * @returns L'User souhaité ou undefined si aucune categorie à cet id
     */
    async findByPk(userId) {
        const result = await client.query(
            "SELECT user_account.id, user_account.alias, to_char(user_account.date_of_birth, 'dd/mm/yyyy') AS date_of_birth, user_account.email, user_account.password, role.name AS role, age(CURRENT_DATE,date(date_of_birth)) as age FROM user_account JOIN role ON role.id = user_account.role_id WHERE user_account.id = $1",
            [userId]
        );
        return result.rows[0];
    },
    /**
     * Récupère par sont id et ses reviews
     * @param {number} userId - L'id de la categorie souhaité
     * @returns La categorie souhaité ou undefined si aucune categorie à cet id
     */
    async findByPkAndReview(userId) {
        const result = await client.query(
            `
            SELECT
                user_account.id,
                user_account.alias,
                to_char(user_account.date_of_birth, 'dd/mm/yyyy') AS date_of_birth,
                user_account.email,
                user_account.password,
                user_account.role_id,
                role.name AS role_name,
                age(CURRENT_DATE,date(date_of_birth)) as age,
                json_agg(
                    json_build_object(
                        'review', review,
                        'beer', json_build_object(
                            'id', beer.id,
                            'name', beer.name,
                            'description', beer.description,
                            'alcohol_level', beer.alcohol_level,
                            'country', json_build_object(
                                'id', country.id,
                                'name', country.name
                            ),
                            'style', json_build_object(
                                'id', style.id,
                                'name', style.name
                            ),
                            'color', json_build_object(
                                'id', color.id,
                                'name', color.name
                            ),
                            'brewery', json_build_object(
                                'id', brewery.id,
                                'name', brewery.name
                            )
                        )
                    ))
            FILTER (WHERE review.id IS NOT NULL)
            AS reviews
            FROM user_account
            JOIN review ON review.user_account_id = user_account.id
            JOIN beer ON beer.id = review.beer_id
            JOIN country ON country.id = beer.country_id
            JOIN style ON style.id = beer.style_id
            JOIN color ON color.id = beer.color_id
            JOIN brewery ON brewery.id = beer.brewery_id
            JOIN role ON role.id = user_account.role_id
            WHERE user_account.id = $1
            GROUP BY user_account.id, role.name
            `,
            [userId]
        );
        return result.rows[0];
    },
    /**
     * Créer un user
     * @param {InputUser} user
     * @returns user
     */
    async create(user) {
        const verificationAlias = {
            text: 'SELECT user_account.alias FROM user_account WHERE user_account.alias = $1',
            values: [user.alias],
        };
        const verificationEmail = {
            text: 'SELECT user_account.email FROM user_account WHERE user_account.email = $1',
            values: [user.email],
        };

        const resultAlias = await client.query(verificationAlias);
        const resultEmail = await client.query(verificationEmail);

        if (resultAlias.rows.length > 0 && resultEmail.rows.length > 0) {
            throw new Error('Email and Alias are already in use');
        }
        if (resultAlias.rows.length > 0) {
            throw new Error('Alias is already in use');
        }
        if (resultEmail.rows.length > 0) {
            throw new Error('Email is already in use');
        }

        if (
            resultAlias.rows.length === 0 &&
            resultEmail.rows.length === 0 &&
            user.role_id == null
        ) {
            const query = {
                text: 'INSERT INTO user_account (alias, date_of_birth, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
                values: [
                    user.alias,
                    user.date_of_birth,
                    user.email,
                    user.password,
                ],
            };
            const savedUser = await client.query(query);

            console.log('User created with role null');
            return savedUser.rows[0];
        }

        const query = {
            text: 'INSERT INTO user_account (alias, date_of_birth, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            values: [
                user.alias,
                user.date_of_birth,
                user.email,
                user.password,
                user.role_id,
            ],
        };
        const savedUser = await client.query(query);

        console.log('User created');
        return savedUser.rows[0];
    },
    /**
     * Supprime de la base de données
     * @param {number} userId - L'id à supprimer
     * @returns Le résultat de la suppression
     */
    async delete(userId) {
        const query = {
            text: 'DELETE FROM user_account WHERE id = $1 RETURNING *',
            values: [userId],
        };

        const deletedUser = await client.query(query);

        console.log('User deleted');
        return deletedUser.rows[0];
    },
};
