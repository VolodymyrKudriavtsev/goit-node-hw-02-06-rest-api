const express = require("express");

const { validateBody, validateId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const ctrl = require("../../controllers/contacts-controllers");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", validateId, ctrl.getContactById);

router.post("/", validateBody(schemas.addContact), ctrl.addContact);

router.put(
  "/:contactId",
  validateId,
  validateBody(schemas.updateContact),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateBody(schemas.updateStatus),
  ctrl.updateStatus
);

router.delete("/:contactId", validateId, ctrl.removeContact);

module.exports = router;
