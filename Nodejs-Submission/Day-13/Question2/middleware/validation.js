const Joi = require("joi");
const { ValidationError } = require("../errors/customErrors");


const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, and number"
    }),
  age: Joi.number().integer().min(18).required()
});


const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return next(new ValidationError(messages.join(", ")));
  }

  next();
};

module.exports = { validateUser };
