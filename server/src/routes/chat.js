const express = require("express");

const chatController = require("../controllers/chat");
const { createChatSchema } = require("../validation-schemas/chat");
const { validateRequest } = require("../middlewares/validation");
const {authorisation} = require("../middlewares/authorisation");

const router = express.Router();

router.post(
  "/",
  authorisation,
  validateRequest(createChatSchema),
  chatController.createChat
);

module.exports = router;
