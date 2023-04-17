const express = require("express");

const { validateBody, validateId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const ctrl = require("../../controllers/contacts-controllers");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, validateId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addContact),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  validateBody(schemas.updateContact),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  validateBody(schemas.updateStatus),
  ctrl.updateStatus
);

router.delete("/:contactId", authenticate, validateId, ctrl.removeContact);

module.exports = router;
