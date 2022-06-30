const Joi = require('joi').extend(require('@joi/date'));

const now = Date.now();
const cutoffDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18); // go back by 18 years

module.exports = Joi.object({
    alias: Joi.string()
        .pattern(/^.{3,20}$/)
        .required(),
    date_of_birth: Joi.date()
        .format(['YYYY/MM/DD', 'DD/MM/YYYY', 'YYYY-MM-DD'])
        .max(cutoffDate)
        .required(),
    email: Joi.string()
        .pattern(
            /^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        )
        .required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    role_id: Joi.number(),
}).required();
