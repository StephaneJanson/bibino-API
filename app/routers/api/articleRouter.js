const express = require('express');

const articleController = require('../../controllers/articleController');
const controllerHandler = require('../../helpers/controllerHandler');
const validate = require('../../validation/validator');
const articleCreateSchema = require('../../validation/schemas/articleCreateSchema');
const articleUpdateSchema = require('../../validation/schemas/articleUpdateSchema');
const verifyToken = require('../../helpers/verifyToken');
const verifyAdmin = require('../../helpers/verifyAdmin');

const router = express.Router();

router
    .route('/')
    /**
     * GET /article
     * @summary Get all articles
     * @tags Article
     * @return {[Article]} 200 - success response - application/json
     */
    .get(controllerHandler(articleController.findAll))
    /**
     * POST /article
     * @summary Post one article
     * @tags Article
     * @param {InputArticle} request.body.required - article new terms
     * @return {Article} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(
        validate('body', articleCreateSchema),
        verifyAdmin,
        controllerHandler(articleController.create)
    );
router
    .route('/:id')
    /**
     * GET /article/{id}
     * @summary Get one article
     * @tags Article
     * @param {number} id.path.required - article identifier
     * @return {Article} 200 - success response - application/json
     */
    .get(controllerHandler(articleController.findByPk))
    /**
     * PATCH /article/{id}
     * @summary Patch one article
     * @tags Article
     * @param {number} id.path.required - article identifier
     * @return {[Article]} 200 - success response - application/json
     */
    .patch(
        validate('body', articleUpdateSchema),
        verifyToken,
        controllerHandler(articleController.update)
    )
    /**
     * DELETE /article/{id}
     * @summary Delete one article
     * @tags Article
     * @param {number} id.path.required - article identifier
     * @return {[Article]} 200 - success response - application/json
     */
    .delete(verifyAdmin, controllerHandler(articleController.delete));

module.exports = router;
