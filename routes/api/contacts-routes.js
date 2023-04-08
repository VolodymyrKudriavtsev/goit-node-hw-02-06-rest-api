const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../decorators");
const { addSchema, updateSchema } = require("../../schemas/contacts-schemas");

const router = express.Router();

router.get("/", ctrl.listContacts);

// router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

// router.delete("/:contactId", ctrl.removeContact);

// router.put("/:contactId", validateBody(updateSchema), ctrl.updateContact);

module.exports = router;
