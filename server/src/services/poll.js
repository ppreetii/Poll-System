const Poll = require("../models/poll");
const { addDaysToDate, formatDateIST } = require("../utils/helper");
const NotFoundError = require("../errors/not-found-error");

exports.createPoll = async (data) => {
  try {
    const poll = new Poll({
      question: data?.question,
      optionA: data?.optionA,
      optionB: data?.optionB,
      optionC: data?.optionC,
      optionD: data?.optionD,
      expiresAt: addDaysToDate(new Date(), 7),
    });
    await poll.save();

    return poll;
  } catch (error) {
    throw error;
  }
};

exports.getAllPolls = async () => {
  try {
    const polls = await Poll.find();

    return polls ?? [];
  } catch (error) {
    throw error;
  }
};

exports.getPoll = async (id) => {
  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      throw new NotFoundError("Poll Not Found");
    }

    return poll;
  } catch (error) {
    throw error;
  }
};

exports.updatePoll = async (id, data) => {
  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      throw new NotFoundError("Poll Not Found");
    }

    if (hasExpired(formatDateIST(new Date()), poll.expiresAt)) {
      throw new Error("Poll has expired");
    }

    if (data?.optionA) {
      poll.countA += 1;
    }
    if (data?.optionB) {
      poll.countB += 1;
    }
    if (data?.optionC) {
      poll.countC += 1;
    }
    if (data?.optionD) {
      poll.countD += 1;
    }

    await poll.save();

    return poll;
  } catch (error) {
    throw error;
  }
};

function hasExpired(givenDate, expiredDate) {
  const givenDateObj = new Date(givenDate);
  const expiredDateObj = new Date(expiredDate);

  return givenDateObj > expiredDateObj;
}
