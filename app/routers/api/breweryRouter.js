const express = require('express');

const breweryController = require('../../controllers/breweryController');
const controllerHandler = require('../../helpers/controllerHandler');
const validate = require('../../validation/validator');
const breweryUpdateSchema = require('../../validation/schemas/breweryUpdateSchema');
const breweryCreateSchema = require('../../validation/schemas/breweryCreateSchema');
const verifyToken = require('../../helpers/verifyToken');
const verifyAdmin = require('../../helpers/verifyToken');

const router = express.Router();

router
    .route('/')
    /**
     * GET /brewery
     * @summary Get all breweries
     * @tags Brewery
     * @return {[Brewery]} 200 - success response - application/json
     */
    .get(controllerHandler(breweryController.findAll))
    /**
     * POST /brewery
     * @summary Post one brewery
     * @tags Brewery
     * @param {InputBrewery} request.body.required - brewery new terms
     * @return {Brewery} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(
        validate('body', breweryCreateSchema),
        verifyToken,
        controllerHandler(breweryController.create)
    );
router
    .route('/:id')
    /**
     * GET /brewery/{id}
     * @summary Get one brewery
     * @tags Brewery
     * @param {number} id.path.required - brewery identifier
     * @return {[Brewery]} 200 - success response - application/json
     */
    .get(controllerHandler(breweryController.findByPk))
    /**
     * PATCH /brewery/{id}
     * @summary Patch one brewery
     * @tags Brewery
     * @param {number} id.path.required - brewery identifier
     * @return {[Brewery]} 200 - success response - application/json
     */
    .patch(
        validate('body', breweryUpdateSchema),
        verifyToken,
        controllerHandler(breweryController.update)
    )
    /**
     * DELETE /brewery/{id}
     * @summary Delete one brewery
     * @tags Brewery
     * @param {number} id.path.required - brewery identifier
     * @return {[Brewery]} 200 - success response - application/json
     */
    .delete(verifyAdmin, controllerHandler(breweryController.delete));

module.exports = router;
