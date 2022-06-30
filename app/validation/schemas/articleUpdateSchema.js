const Joi = require('joi').extend(require('@joi/date'));

module.exports = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    beer_id: Joi.number(),
    publication_date: Joi.date(),
    user_account_id: Joi.number(),
}).required();
