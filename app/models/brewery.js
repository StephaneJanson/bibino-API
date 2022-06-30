const client = require('../config/db');
/**
 * @typedef {object} Brewery
 * @property {number} id - Identifiant unique Pk de la table
 * @property {string} name -nom de la brasserie
 */
/**
 * @typedef {object} InputBrewery
 * @property {string} name -nom de la brasserie
 */

module.exports = {
    /**
     * Récupére tout sans filtre ni ordre
     * @returns Tous les brasseries dans la base de donnée
     */
    async findAll() {
        const result = await client.query('SELECT id, name FROM brewery');
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} breweryId - L'id de la brasserie souhaitée
     * @returns La brasserie souhaitée ou undefined si aucune categorie à cet id
     */
    async findByPk(breweryId) {
        const result = await client.query(
            'SELECT id, name FROM brewery WHERE id = $1',
            [breweryId]
        );
        return result.rows[0];
    },
    /**
     * Modifie une brasserie
     * @param {number} breweryId
     * @param {InputBrewery} brewery
     * @returns brewery
     */
    async update(breweryId, brewery) {
        const fields = Object.keys(brewery).map(
            (prop, index) => `"${prop}" = $${index + 1}`
        );
        const values = Object.values(brewery);

        const query = {
            text: `UPDATE brewery SET ${fields} WHERE id = $${
                fields.length + 1
            } RETURNING *`,
            values: [...values, breweryId],
        };
        const updateBrewery = await client.query(query);

        console.log('Brewery updated');
        return updateBrewery.rows[0];
    },
    /**
     * Créer une brasserie
     * @param {InputBrewery} brewery
     * @returns brewery
     */
    async create(brewery) {
        const verificationBrewery = {
            text: 'SELECT name FROM brewery WHERE name =$1',
            values: [brewery.name],
        };
        const resultBrewery = await client.query(verificationBrewery);
        if (resultBrewery.rows.length > 0) {
            throw new Error('Brewery already exists');
        }
        const query = {
            text: 'INSERT INTO brewery (name) VALUES ($1) RETURNING *',
            values: [brewery.name],
        };
        const createBrewery = await client.query(query);
        console.log('Brewery created');
        return createBrewery.rows[0];
    },
    /**
     * Supprime de la base de données
     * @param {number} id - L'id à supprimer
     * @returns Le résultat de la suppression
     */
    async delete(id) {
        const result = await client.query(
            'DELETE FROM brewery WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    },
};
