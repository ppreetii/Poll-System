const express = require("express");

const userController = require("../controllers/user");
const { createUserSchema, loginSchema } = require("../validation-schemas/user");
const { validateRequest } = require("../middlewares/validation");
const API = require("../constants/api");

const router = express.Router();

router.post(
  `${API.SIGNUP}`,
  validateRequest(createUserSchema),
  userController.createUser
);

router.post(
  `${API.LOGIN}`,
  validateRequest(loginSchema),
  userController.login
);

router.post(
  `${API.LOGOUT}`,
  userController.logout
);

router.get(
  `${API.CURRENT}`,
  
)
module.exports = router;
