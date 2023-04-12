const { ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const result = await User.create(req.body);
  res.status(201).json({
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
