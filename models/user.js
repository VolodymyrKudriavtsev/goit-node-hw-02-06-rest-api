const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { mongooseError } = require("../utils");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Set password for user"],
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    token: String,
  },

  { versionKey: false }
);

userSchema.post("save", mongooseError);

const userRegLog = Joi.object({
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

  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password field`,
    "string.empty": `password cannot be an empty field`,
    "string.min": `password must be at least 6 characters long`,
  }),
});

const schemas = { userRegLog };

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
