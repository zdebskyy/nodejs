const Joi = require("joi");

function validateCreateContact(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    phone: Joi.string().min(1).required(),
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
    phone: Joi.string().min(1),
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

function validateUserRegistration(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(1).required(),
    subscription: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}

function validateUserLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(1).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}

function validateSubscription(req, res, next) {
  const schema = Joi.object({
    subscription: Joi.string().valid("free", "pro", "premium"),
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
  validateUserRegistration,
  validateUserLogin,
  validateSubscription,
};
