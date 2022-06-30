const breweryDataMapper = require('../models/brewery');
const beerDataMapper = require('../models/beer');

module.exports = {
    /**
     * Brewery controller to find all breweries.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const breweries = await breweryDataMapper.findAll();
        return res.json(breweries);
    },
    /**
     * Brewery controller to find one brewery.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const brewery = await breweryDataMapper.findByPk(req.params.id);

        if (!brewery) {
            throw new Error('brewery not found', { statusCode: 404 });
        }

        return res.json(brewery);
    },
    /**
     * Brewery controller to update one brewery.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async update(req, res) {
        const breweryInBdd = await breweryDataMapper.findByPk(req.params.id);
        if (!breweryInBdd) {
            throw new Error('This brewery does not exists', {
                statusCode: 404,
            });
        }
        const brewery = {
            name: req.body.name.toLowerCase(),
        };
        const savedBrewery = await breweryDataMapper.update(
            req.params.id,
            brewery
        );
        return res.json(savedBrewery);
    },
    /**
     * Brewery controller to create one brewery.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async create(req, res) {
        const brewery = {
            name: req.body.name.toLowerCase(),
        };

        const savedBrewery = await breweryDataMapper.create(brewery);
        return res.json(savedBrewery);
    },
    /**
     * Brewery controller to delete one brewery.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const brewery = await breweryDataMapper.findByPk(req.params.id);
        const beers = await beerDataMapper.findAll();

        if (!brewery) {
            throw new Error('This brewery does not exists', {
                statusCode: 404,
            });
        }
        const beerVerify = beers.find((beer) => beer.brewery === brewery.name);

        if (beerVerify !== undefined) {
            throw new Error('This brewery is attached to a beer', {
                statusCode: 404,
            });
        }
        await breweryDataMapper.delete(req.params.id);

        return res.json(brewery);
    },
};
