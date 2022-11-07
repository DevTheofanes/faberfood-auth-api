import * as Joi from 'joi';

export const CreateAccountSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(11).max(11),
}).options({
  abortEarly: false,
});

export const UpdateAccountSchema = Joi.object({
  name: Joi.string(),
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(11).max(11),
}).options({
  abortEarly: false,
});
