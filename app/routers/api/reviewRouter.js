const express = require('express');

const reviewController = require('../../controllers/reviewController');
const controllerHandler = require('../../helpers/controllerHandler');
const validate = require('../../validation/validator');
const userUpdateSchema = require('../../validation/schemas/reviewUpdateSchema');
const reviewCreateSchema = require('../../validation/schemas/reviewCreateSchema');
const verifyToken = require('../../helpers/verifyToken');

const router = express.Router();

router
    .route('/')
    /**
     * GET /review
     * @summary Get all reviews
     * @tags Review
     * @return {[Review]} 200 - success response - application/json
     */
    .get(controllerHandler(reviewController.findAll))
    /**
     * POST /review
     * @summary Post one review
     * @tags Review
     * @param {InputReview} request.body.required - review new terms
     * @return {Review} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(
        validate('body', reviewCreateSchema),
        verifyToken,
        controllerHandler(reviewController.create)
    );
router
    .route('/:id')
    /**
     * GET /review/{id}
     * @summary Get one review
     * @tags Review
     * @param {number} id.path.required - review identifier
     * @return {[Review]} 200 - success response - application/json
     */
    .get(controllerHandler(reviewController.findByPk))
    /**
     * PATCH /review/{id}
     * @summary Patch one review
     * @tags Review
     * @param {number} id.path.required - review identifier
     * @return {[Review]} 200 - success response - application/json
     */
    .patch(
        validate('body', userUpdateSchema),
        verifyToken,
        controllerHandler(reviewController.update)
    )
    /**
     * DELETE /review/{id}
     * @summary Delete one review
     * @tags Review
     * @param {number} id.path.required - review identifier
     * @return {[Review]} 200 - success response - application/json
     */
    .delete(verifyToken, controllerHandler(reviewController.delete));
module.exports = router;
