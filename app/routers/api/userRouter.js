const express = require('express');

const validate = require('../../validation/validator');
const userAccountCreateSchema = require('../../validation/schemas/user_accountCreateSchema');
const verifyAdmin = require('../../helpers/verifyAdmin');

const userController = require('../../controllers/userController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /user
     * @summary Get all users
     * @tags User
     * @return {[User]} 200 - success response - application/json
     */
    .get(controllerHandler(userController.findAll))
    /**
     * POST /user
     * @summary Post one user
     * @tags User
     * @param {InputUser} request.body.required - user new terms
     * @return {User} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(
        validate('body', userAccountCreateSchema),
        controllerHandler(userController.create)
    );

router
    .route('/:id')
    /**
     * GET /user/{id}
     * @summary Get one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {[User]} 200 - success response - application/json
     */
    .get(controllerHandler(userController.findByPk))
    /**
     * DELETE /user/{id}
     * @summary Delete one user
     * @tags User
     * @param {number} id.path.required - user identifier
     * @return {[User]} 200 - success response - application/json
     */
    .delete(verifyAdmin, controllerHandler(userController.delete));
router
    .route('/:id/review')
    /**
     * GET /user/{id}/review
     * @summary get all user reviews
     * @tags User reviews
     * @param {number} id.path.required - user identifier
     * @return {[User]} 200 - success response - application/json
     */
    .get(controllerHandler(userController.findByPkAndReview));

module.exports = router;
