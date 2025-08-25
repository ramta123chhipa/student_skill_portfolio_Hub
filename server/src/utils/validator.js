const Joi = require("joi");

// ✅ Register Validation Schema
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("student", "admin").default("student"),
});

// ✅ Login Validation Schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ✅ Student Search Validation Schema
const searchSchema = Joi.object({
  skill: Joi.string().optional(),
  branch: Joi.string().optional(),
  year: Joi.number().integer().min(1).max(4).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  searchSchema,
};
