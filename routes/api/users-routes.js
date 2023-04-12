const express = require("express");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users-controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.userRegLog), ctrl.register);

module.exports = router;
