const client = require('../config/db');
/**
 * @typedef {object} Country
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name -nom du pays
 */
/**
 * @typedef {object} InputCountry
 * @property {string} name -nom du pays
 */

module.exports = {
    /**
     * Récupère tout sans filtre ni ordre
     * @returns Tous les pays dans la base de donnée
     */
    async findAll() {
        const result = await client.query('SELECT id, name FROM country');
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} countryId - L'id du pays souhaité
     * @returns Le pays souhaité ou undefined si aucun pays à cet id
     */
    async findByPk(countryId) {
        const result = await client.query(
            'SELECT id, name FROM country WHERE id = $1',
            [countryId]
        );
        return result.rows[0];
    },
    /**
     * Modifie dans la base de données
     * @param {number} countryId - L'id à modifier
     * @param {InputCountry} country - Les données à modifier
     * @returns Le Post modifié
     */
    async update(countryId, country) {
        const query = {
            text: 'UPDATE country SET name = $1 WHERE id = $2 RETURNING *',
            values: [country.name, countryId],
        };
        const updateCountry = await client.query(query);
        console.log('Country updated');
        return updateCountry.rows[0];
    },
    /**
     * Créer un pays
     * @param {InputCountry} country
     * @returns country
     */
    async create(country) {
        const verificationCountry = {
            text: 'SELECT name FROM country WHERE name =($1) ',
            values: [country.name],
        };
        const resultCountry = await client.query(verificationCountry);
        if (resultCountry.rows.length > 0) {
            throw new Error('Country already exists');
        }
        const query = {
            text: 'INSERT INTO country (name) VALUES ($1) RETURNING *',
            values: [country.name],
        };
        const createCountry = await client.query(query);
        console.log('Country created');
        return createCountry.rows[0];
    },
    /**
     * Supprime de la base de données
     * @param {number} countryId - L'id à supprimer
     * @returns Le résultat de la suppression
     */
    async delete(countryId) {
        const query = {
            text: 'DELETE FROM country WHERE id = $1 RETURNING *',
            values: [countryId],
        };
        const deletedCountry = await client.query(query);

        console.log('Country deleted');
        return deletedCountry.rows[0];
    },
};
