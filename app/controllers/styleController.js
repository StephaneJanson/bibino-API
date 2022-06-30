const styleDataMapper = require('../models/style');

module.exports = {
    /**
     * Style controller to find all styles
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findAll(req, res) {
        const styles = await styleDataMapper.findAll();
        return res.json(styles);
    },
    /**
     * Style controller to find one style
     * ExpressMiddleware signature
     * @param {object} req Express request object
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    async findByPk(req, res) {
        const style = await styleDataMapper.findByPk(req.params.id);

        if (!style) {
            throw new Error('Style not found', { statusCode: 404 });
        }

        return res.json(style);
    },
};
