const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const validateId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `id "${contactId}" is invalid`));
  }

  next();
};

module.exports = validateId;
