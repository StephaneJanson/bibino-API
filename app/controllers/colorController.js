const colorDataMapper = require('../models/color');

module.exports = {
    /**
     * Color controller to find all color
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const colors = await colorDataMapper.findAll();
        return res.json(colors);
    },
    /**
     * Color controller to find one color
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const color = await colorDataMapper.findByPk(req.params.id);

        if (!color) {
            throw new Error('Color not found', { statusCode: 404 });
        }

        return res.json(color);
    },
};
