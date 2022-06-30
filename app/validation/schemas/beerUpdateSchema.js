const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    alcohol_level: Joi.number(),
    country_id: Joi.string(),
    style_id: Joi.string(),
    color_id: Joi.string(),
    brewery_id: Joi.string(),
    user_account_id: Joi.number(),
})
    .min(1)
    .required();
