const express = require('express');

const countryController = require('../../controllers/countryController');
const controllerHandler = require('../../helpers/controllerHandler');
const validate = require('../../validation/validator');
const countryUpdateSchema = require('../../validation/schemas/countryUpdateSchema');
const countryCreateSchema = require('../../validation/schemas/countryCreateSchema');
const verifyToken = require('../../helpers/verifyToken');
const verifyAdmin = require('../../helpers/verifyAdmin');

const router = express.Router();

router
    .route('/')
    /**
     * GET /country
     * @summary Get all countries
     * @tags Country
     * @return {[Country]} 200 - success response - application/json
     */
    .get(controllerHandler(countryController.findAll))
    /**
     * POST /country
     * @summary Post one country
     * @tags Country
     * @param {InputCountry} request.body.required - country new terms
     * @return {Country} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(
        validate('body', countryCreateSchema),
        verifyToken,
        controllerHandler(countryController.create)
    );
router
    .route('/:id')
    /**
     * GET /country/{id}
     * @summary Get one country
     * @tags Country
     * @param {number} id.path.required - country identifier
     * @return {[Country]} 200 - success response - application/json
     */
    .get(controllerHandler(countryController.findByPk))
    /**
     * PATCH /country/{id}
     * @summary Patch one country
     * @tags Country
     * @param {number} id.path.required - country identifier
     * @return {[Country]} 200 - success response - application/json
     */
    .patch(
        validate('body', countryUpdateSchema),
        verifyToken,
        controllerHandler(countryController.update)
    )
    /**
     * DELETE /country/{id}
     * @summary Delete one country
     * @tags Country
     * @param {number} id.path.required - country identifier
     * @return {[Country]} 200 - success response - application/json
     */
    .delete(verifyAdmin, controllerHandler(countryController.delete));

module.exports = router;
