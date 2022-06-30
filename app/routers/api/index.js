const express = require('express');

const beerRouter = require('./beerRouter');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter');
const reviewRouter = require('./reviewRouter');
const authRouter = require('./authRouter');
const colorRouter = require('./colorRouter');
const styleRouter = require('./styleRouter');
const breweryRouter = require('./breweryRouter');
const countryRouter = require('./countryRouter');
const { ApiError } = require('../../helpers/errorHandler');
const { apiController } = require('../../controllers');

const router = express.Router();

router.all('/', apiController.home);

router.use('/beer', beerRouter);
router.use('/user', userRouter);
router.use('/article', articleRouter);
router.use('/review', reviewRouter);
router.use('/', authRouter);
router.use('/color', colorRouter);
router.use('/style', styleRouter);
router.use('/brewery', breweryRouter);
router.use('/country', countryRouter);

router.use(() => {
    // Ici on force une erreur, afin de déclencher le gestionnaire d'erreur et donc l'affichage de
    // l'erreur
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
