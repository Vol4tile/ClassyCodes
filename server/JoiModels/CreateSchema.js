import Joi from "joi";

export const CreateSchema = Joi.object({
  baslik: Joi.string().min(10).max(50).required(),
  yazi: Joi.string().min(16).max(1000000).required(),
  postedBy: Joi.string().required(),
});

export const UserQuestionSchema = Joi.object({
  username: Joi.string().required(),
});
export const UserDataSchema = Joi.object({
  username: Joi.string().required(),
});
export const signInSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
export const searchUserSchema = Joi.object({
  search: Joi.string().required().trim().min(1),
});
