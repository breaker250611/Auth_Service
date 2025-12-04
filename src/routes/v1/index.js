const express = require("express");
const userController = require("../../controller/user-controller");
const router = express.Router();
const { AuthRequestValidators } = require("../../middleware/index");
router.post(
  "/signup",
  AuthRequestValidators.validateUserAuth,
  userController.create
);
router.post("/signin", userController.signIn);

router.get("/isAuthenticated", userController.isAuthenticated);

router.post(
  "/isAdmin",
  AuthRequestValidators.validateIsAdmingRequest,
  userController.isAdmin
);
module.exports = router;
