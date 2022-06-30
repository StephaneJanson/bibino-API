const Joi = require('joi').extend(require('@joi/date'));

module.exports = Joi.object({
    title: Joi.string(),
    content: Joi.string().required(),
    beer_id: Joi.string(),
    publication_date: Joi.date(),
    user_account_id: Joi.number().required(),
}).required();
