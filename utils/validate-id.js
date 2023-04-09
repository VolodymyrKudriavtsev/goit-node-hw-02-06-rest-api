const { default: mongoose } = require("mongoose");

const { HttpError } = require("../helpers");

const validateId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw HttpError(404);
  }
};

module.exports = validateId;
