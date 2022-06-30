const client = require('../config/db');
/**
 * @typedef {object} Review
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} content - contenu du commentaire
 * @property {number} note - note de la bière
 * @property {number} beer_id - id de la bière
 * @property {number} user_account_id - id de l'user
 */
/**
 * @typedef {object} InputReview
 * @property {string} content - contenu du commentaire
 * @property {number} note - note de la bière
 * @property {number} beer_id - id de la bière
 * @property {number} user_account_id - id de l'user
 */

module.exports = {
    /**
     * Récupère tout sans filtre ni ordre
     * @returns Toutes les reviews dans la base de donnée
     */
    async findAll() {
        const result = await client.query(
            'select review.id, user_account.alias, beer.name, review.content, review.note from review JOIN beer ON beer.id = review.beer_id JOIN user_account ON user_account.id = review.user_account_id'
        );
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} reviewId - L'id du style souhaité
     * @returns La review souhaitée ou undefined si aucune review à cet id
     */
    async findByPk(reviewId) {
        const result = await client.query(
            'select review.id, user_account.alias, beer.name, review.content, review.note from review JOIN beer ON beer.id = review.beer_id JOIN user_account ON user_account.id = review.user_account_id WHERE review.id = $1',
            [reviewId]
        );
        return result.rows[0];
    },
    /**
     * @param {createReview} review
     * @returns Review
     */
    async create(review) {
        const query = {
            text: 'INSERT INTO review (content, note, beer_id, user_account_id) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [
                review.content,
                review.note,
                review.beer_id,
                review.user_account_id,
            ],
        };
        const savedReview = await client.query(query);

        console.log('Review created');
        return savedReview.rows[0];
    },
    /**
     * Modifie dans la base de données
     * @param {number} reviewId - L'id à modifier
     * @param {InputReview} review - Les données à modifier
     * @returns Le Post modifié
     */
    async update(reviewId, review) {
        const fields = Object.keys(review).map(
            (prop, index) => `"${prop}" = $${index + 1}`
        );
        const values = Object.values(review);

        const query = {
            text: `UPDATE review SET ${fields} WHERE id = $${
                fields.length + 1
            } RETURNING *`,
            values: [...values, reviewId],
        };
        const updateReview = await client.query(query);

        console.log('Review updated');
        return updateReview.rows[0];
    },
    /**
     * Supprime de la base de données
     * @param {number} reviewId - L'id à supprimer
     * @returns Le résultat de la suppression
     */
    async delete(reviewId) {
        const query = {
            text: 'DELETE FROM review WHERE id = $1 RETURNING *',
            values: [reviewId],
        };

        const reviewBeer = await client.query(query);

        console.log('Review deleted');
        return reviewBeer.rows[0];
    },
};
