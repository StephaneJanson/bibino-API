const express = require('express');

const styleController = require('../../controllers/styleController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /style
     * @summary Get all styles
     * @tags Style
     * @return {[Style]} 200 - success response - application/json
     */ .get(controllerHandler(styleController.findAll));
router
    .route('/:id')
    /**
     * GET /style/{id}
     * @summary Get one style
     * @tags Style
     * @param {number} id.path.required - style identifier
     * @return {[Style]} 200 - success response - application/json
     */ .get(controllerHandler(styleController.findByPk));

module.exports = router;
