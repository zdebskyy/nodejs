const Joi = require("joi");

function validateCreateContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(1).required(),
    subscription: Joi.string(),
    token: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}

function validatePatchContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().min(1).email(),
    password: Joi.string().min(1),
    subscription: Joi.string(),
    token: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}

module.exports = {
  validateCreateContact,
  validatePatchContact,
};
