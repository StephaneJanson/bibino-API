const express = require('express');

const apiRouter = require('./api');
const { errorHandler } = require('../helpers/errorHandler');

const router = express.Router();

router.use('/', apiRouter);
router.use((err, _, response, next) => {
    errorHandler(err, response, next);
});

module.exports = router;
