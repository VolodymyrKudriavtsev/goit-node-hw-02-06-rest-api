const { ctrlWrapper } = require("../decorators");
const ContactModel = require("../models/contact");
const { HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await ContactModel.find();
  res.json(result);
};

// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);
//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json(result);
// };

const addContact = async (req, res) => {
  const result = await ContactModel.create(req.body);
  res.status(201).json(result);
};

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json({ message: "contact deleted" });
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);
//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json(result);
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact),
};
