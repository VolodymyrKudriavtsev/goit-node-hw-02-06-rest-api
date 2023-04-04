const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.empty": `name cannot be an empty field`,
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": `missing required email field`,
      "string.empty": `email cannot be an empty field`,
    }),

  phone: Joi.string()
    .min(7)
    .max(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "any.required": `missing required phone field`,
      "string.empty": `phone cannot be an empty field`,
      "string.pattern.base":
        "the phone number can only contain numbers from 0 to 9",
      "string.min": `the phone number can contain from 7 to 10 characters`,
      "string.max": `the phone number can contain from 7 to 10 characters`,
    }),
});

const updateSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": `name cannot be an empty field`,
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.empty": `email cannot be an empty field`,
    }),

  phone: Joi.string()
    .min(7)
    .max(10)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.empty": `phone cannot be an empty field`,
      "string.pattern.base":
        "the phone number can only contain numbers from 0 to 9",
      "string.min": `the phone number can contain from 7 to 10 characters`,
      "string.max": `the phone number can contain from 7 to 10 characters`,
    }),
})
  .min(1)
  .messages({ "object.min": "missing fields" });

module.exports = {
  addSchema,
  updateSchema,
};
