const express = require("express");

// const { validateBody, validateId, authenticate } = require("../../middlewares");
// const { schemas } = require("../../models/contact");
const ctrl = require("../../controllers/news-controllers-temporary");

const router = express.Router();

router.get("/", ctrl.allNews);

module.exports = router;
