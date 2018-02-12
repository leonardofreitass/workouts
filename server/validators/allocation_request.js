const Joi = require('joi');

module.exports = () => Joi.object().keys({
  workout_id: Joi.number().required(),
  participants: Joi.array().items(Joi.number()).required(),
});
