const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addContact), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(schemas.updateContact),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateStatus),
  ctrl.updateStatus
);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
