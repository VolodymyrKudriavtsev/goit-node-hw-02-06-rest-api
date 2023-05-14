const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users-controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.userRegLog), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verification);

router.post(
  "/verify/",
  validateBody(schemas.resendVerifyEmail),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.userRegLog), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
