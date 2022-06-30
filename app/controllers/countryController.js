const countryDataMapper = require('../models/country');
const beerDataMapper = require('../models/beer');

module.exports = {
    /**
     * Country controller to find all countries
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const countries = await countryDataMapper.findAll();
        return res.json(countries);
    },
    /**
     * Country controller to find one country
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const country = await countryDataMapper.findByPk(req.params.id);

        if (!country) {
            throw new Error('country not found', { statusCode: 404 });
        }

        return res.json(country);
    },
    /**
     * Category controller to update one country
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async update(req, res) {
        const countryInBdd = await countryDataMapper.findByPk(req.params.id);
        if (!countryInBdd) {
            throw new Error('This country does not exists', {
                statusCode: 404,
            });
        }
        const country = {
            name: req.body.name.toLowerCase(),
        };
        const savedCountry = await countryDataMapper.update(
            req.params.id,
            country
        );
        return res.json(savedCountry);
    },
    /**
     * Category controller to create one country
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async create(req, res) {
        const country = {
            name: req.body.name.toLowerCase(),
        };

        const savedCountry = await countryDataMapper.create(country);
        return res.json(savedCountry);
    },
    /**
     * Category controller to delete one country
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const country = await countryDataMapper.findByPk(req.params.id);
        const beers = await beerDataMapper.findAll();

        if (!country) {
            throw new Error('This country does not exists', {
                statusCode: 404,
            });
        }
        const beerVerify = beers.find((beer) => beer.country === country.name);

        if (beerVerify !== undefined) {
            throw new Error('This country is attached to a beer', {
                statusCode: 404,
            });
        }
        await countryDataMapper.delete(req.params.id);

        return res.json(country);
    },
};
