const Joi = require('joi');

module.exports = Joi.object({
    content: Joi.string().pattern(/^.{2,300}$/),
    note: Joi.number(),
    beer_id: Joi.number(),
    user_account_id: Joi.number(),
})
    .min(1)
    .required();
