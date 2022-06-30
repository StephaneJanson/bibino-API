const client = require('../config/db');
beerDataMapper = require('../models/beer');

module.exports = {
    async generate() {
        const beers = await beerDataMapper.findAll();
        const beerName = await client.query(
            `SELECT name FROM beer WHERE id = 1`
        );

        return beers, beerName;
    },
};
