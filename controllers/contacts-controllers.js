const { ctrlWrapper, validateId } = require("../utils");
const { ContactModel } = require("../models/contact");

const { HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await ContactModel.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const result = await ContactModel.findById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await ContactModel.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  validateId(contactId);
  const result = await ContactModel.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatus: ctrlWrapper(updateStatus),
  removeContact: ctrlWrapper(removeContact),
};
