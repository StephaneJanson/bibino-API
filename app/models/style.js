const client = require('../config/db');

module.exports = {
    /**
     * Récupère tout sans filtre ni ordre
     * @returns Tous les styles dans la base de donnée
     */
    async findAll() {
        const result = await client.query('SELECT id, name FROM style');
        return result.rows;
    },
    /**
     * Récupère par son id
     * @param {number} styleId - L'id du style souhaité
     * @returns Le style souhaité ou undefined si aucun style à cet id
     */
    async findByPk(styleId) {
        const result = await client.query(
            'SELECT id, name FROM style WHERE id = $1',
            [styleId]
        );
        return result.rows[0];
    },
};
