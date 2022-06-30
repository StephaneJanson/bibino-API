const client = require('../config/db');

module.exports = {
    /**
     * Récupére tout sans filtre ni ordre
     * @returns Toutes les couleurs dans la base de donnée
     */
    async findAll() {
        const result = await client.query('SELECT id, name FROM color');
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} colorId - L'id de l'user souhaité
     * @returns Le pays souhaité ou undefined si aucune couleur à cet id
     */
    async findByPk(colorId) {
        const result = await client.query(
            'SELECT id, name FROM color WHERE id = $1',
            [colorId]
        );
        return result.rows[0];
    },
};
