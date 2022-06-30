const express = require('express');

const authController = require('../../controllers/authController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/login')
    /**
     * POST /login
     * @summary Post login
     * @tags Login
     * @param {InputUserLogin} request.body.required - review new terms
     * @return {Login} 200 - success response - application/json
     * @return {error} 400 - input data invalid
     */
    .post(controllerHandler(authController.login));
router.route('/logout').post(controllerHandler(authController.logout));

module.exports = router;
