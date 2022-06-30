const beerDataMapper = require('../models/beer');

module.exports = {
    /**
     * Beer controller to get all beers.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const beers = await beerDataMapper.findAll();
        return res.json(beers);
    },
    /**
     * Beer controller to get top beers.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findTopBeers(req, res) {
        const beers = await beerDataMapper.findTopBeers();
        return res.json(beers);
    },
    /**
     * Beer controller to get one beers.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const beer = await beerDataMapper.findByPk(req.params.id);

        if (!beer) {
            throw new Error('Beer not found', { statusCode: 404 });
        }

        return res.json(beer);
    },
    /**
     * Beer controller to create a beer.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async create(req, res) {
        const beer = {
            name: req.body.name.toLowerCase(),
            description: req.body.description,
            alcohol_level: req.body.alcohol_level,
            country_id: req.body.country_id.toLowerCase(),
            style_id: req.body.style_id,
            color_id: req.body.color_id,
            brewery_id: req.body.brewery_id.toLowerCase(),
            user_account_id: req.body.user_account_id,
        };

        const savedBeer = await beerDataMapper.create(beer);
        return res.json(savedBeer);
    },
    /**
     * Beer controller to update a beer.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async update(req, res) {
        const beerInBdd = await beerDataMapper.findByPk(req.params.id);
        if (!beerInBdd) {
            throw new Error('This beer does not exists', { statusCode: 404 });
        }
        const beer = {
            name: req.body.name.toLowerCase(),
            description: req.body.description,
            alcohol_level: req.body.alcohol_level,
            country_id: req.body.country_id.toLowerCase(),
            style_id: req.body.style_id,
            color_id: req.body.color_id,
            brewery_id: req.body.brewery_id.toLowerCase(),
            user_account_id: req.body.user_account_id,
        };
        const savedBeer = await beerDataMapper.update(req.params.id, beer);
        return res.json(savedBeer);
    },
    /**
     * Beer controller to delete a beer.
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async delete(req, res) {
        const beer = await beerDataMapper.findByPk(req.params.id);

        if (!beer) {
            throw new Error('This beer does not exists', { statusCode: 404 });
        }
        await beerDataMapper.delete(req.params.id);

        return res.json(beer);
    },
};
