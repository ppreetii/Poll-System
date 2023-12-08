const express = require("express");

const pollController = require("../controllers/poll");
const { createPollSchema, getPollSchema,updatePollSchema} = require("../validation-schemas/poll");
const { validateRequest } = require("../middlewares/validation");
const {authorisation} = require("../middlewares/authorisation");
const API = require("../constants/api");

const router = express.Router();

router.post(
  "/",
  authorisation,
  validateRequest(createPollSchema),
  pollController.createPoll
);

router.get(
  `${API.ID}`,
  authorisation,
  validateRequest(null, true,getPollSchema),
  pollController.getPoll
);

router.get(
  "/",
  authorisation,
  pollController.getAllPolls
);

router.patch(
  `${API.ID}`,
  authorisation,
  validateRequest(updatePollSchema, true,getPollSchema),
  pollController.updatePoll
);

module.exports = router;
