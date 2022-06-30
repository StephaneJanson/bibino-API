const Joi = require('joi');

module.exports = Joi.object({
    content: Joi.string().required(),
    note: Joi.number().required(),
    beer_id: Joi.number().required(),
    user_account_id: Joi.number().required(),
}).required();
