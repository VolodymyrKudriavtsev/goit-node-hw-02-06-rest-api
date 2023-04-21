const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const { ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;
const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: { email: result.email, subscription: result.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.json({ email, subscription });
};

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, filename } = req.file;
  const { _id } = req.user;
  const avatarName = `${_id}_${filename}`;

  const image = await jimp.read(tmpUpload);
  await image.resize(250, 250);
  await image.writeAsync(tmpUpload);

  const resultUpload = path.join(avatarsDir, avatarName);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
