const articleController = require('./articleController');
const authController = require('./authController');
const beerController = require('./beerController');
const reviewController = require('./reviewController');
const userController = require('./userController');
const colorController = require('./colorController');
const styleController = require('./styleController');
const breweryController = require('./breweryController');

const apiController = {
    /**
     * Default API controller to show documention url.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
        });
    },
};

module.exports = {
    apiController,
    articleController,
    authController,
    beerController,
    reviewController,
    userController,
    colorController,
    styleController,
    breweryController,
};
