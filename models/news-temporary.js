const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { mongooseError } = require("../utils");

const newsSchema = Schema(
  {
    imgUrl: {
      type: String,
    },

    title: {
      type: String,
    },

    text: {
      type: String,
    },

    date: {
      type: String,
    },

    url: {
      type: String,
    },
  },

  { versionKey: false }
);

newsSchema.post("save", mongooseError);

const News = model("news", newsSchema);

module.exports = {
  News,
};
