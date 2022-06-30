const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    alcohol_level: Joi.number().required(),
    country_id: Joi.string().required(),
    style_id: Joi.string().required(),
    color_id: Joi.string().required(),
    brewery_id: Joi.string().required(),
    user_account_id: Joi.number().required(),
})
    .min(1)
    .required();
