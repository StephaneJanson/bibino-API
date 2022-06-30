const express = require('express');

const validate = require('../../validation/validator');
const beerCreateSchema = require('../../validation/schemas/beerCreateSchema');
const beerUpdateSchema = require('../../validation/schemas/beerUpdateSchema');

const beerController = require('../../controllers/beerController');
const controllerHandler = require('../../helpers/controllerHandler');
const verifyToken = require('../../helpers/verifyToken');
const verifyAdmin = require('../../helpers/verifyAdmin');

const router = express.Router();

router
    .route('/')
    /**
     * GET /beer
     * @summary Get all beers
     * @tags Beer
     * @return {[Beer]} 200 - success response - application/json
     */
    .get(controllerHandler(beerController.findAll))
    /**
     * POST /beer
     * @summary Post one beer
     * @tags Beer
     * @param {InputBeer} request.body.required - beer new terms
     * @return {Beer} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(
        validate('body', beerCreateSchema),
        verifyAdmin,
        controllerHandler(beerController.create)
    );
router
    .route('/topBeers')
    /**
     * GET /beer/topBeers
     * @summary Get top beers
     * @tags Beer
     * @return {[Beer]} 200 - success response - application/json
     */ .get(controllerHandler(beerController.findTopBeers));
router
    .route('/:id')
    /**
     * GET /beer/{id}
     * @summary Get one beer
     * @tags Beer
     * @param {number} id.path.required - beer identifier
     * @return {[Beer]} 200 - success response - application/json
     */
    .get(controllerHandler(beerController.findByPk))
    /**
     * PATCH /beer/{id}
     * @summary Patch one beer
     * @tags Beer
     * @param {number} id.path.required - beer identifier
     * @return {[Beer]} 200 - success response - application/json
     */
    .patch(
        validate('body', beerUpdateSchema),
        verifyToken,
        controllerHandler(beerController.update)
    )
    /**
     * DELETE /beer/{id}
     * @summary Delete one beer
     * @tags Beer
     * @param {number} id.path.required - beer identifier
     * @return {[Beer]} 200 - success response - application/json
     */
    .delete(verifyAdmin, controllerHandler(beerController.delete));

module.exports = router;
