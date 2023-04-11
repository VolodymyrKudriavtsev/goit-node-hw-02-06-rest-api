const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { mongooseError } = require("../utils");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", mongooseError);

const addContact = Joi.object({
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

  favorite: Joi.boolean(),
});

const updateContact = Joi.object({
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

  favorite: Joi.boolean(),
})
  .min(1)
  .messages({ "object.min": "missing fields" });

const updateStatus = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const schemas = {
  addContact,
  updateContact,
  updateStatus,
};

const ContactModel = model("contact", contactSchema);

module.exports = {
  ContactModel,
  schemas,
};
