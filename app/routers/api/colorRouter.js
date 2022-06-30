const express = require('express');

const colorController = require('../../controllers/colorController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /color
     * @summary Get all colors
     * @tags Color
     * @return {[Color]} 200 - success response - application/json
     */ .get(controllerHandler(colorController.findAll));
router
    .route('/:id')
    /**
     * GET /color/{id}
     * @summary Get one color
     * @tags Color
     * @param {number} id.path.required - color identifier
     * @return {[Color]} 200 - success response - application/json
     */
    .get(controllerHandler(colorController.findByPk));

module.exports = router;
