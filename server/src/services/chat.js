const Chat = require("../models/chat");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found-error");
const NotAuthorisedError = require("../errors/not-authorised-error");

exports.createChat = async (loginId, data) => {
  try {
    const user = await User.findById(data?.userId);
    if (!user) {
      throw new NotFoundError("User Not Found");
    }
    if (loginId !== user.id) {
      throw new NotAuthorisedError();
    }

    const chat = new Chat({
      userId: data?.userId,
      message: data?.message,
    });

    await chat.save();

    return {
      id: chat.id,
      message: chat.message,
      userId: chat.userId,
      name: user.name,
    };
  } catch (error) {
    throw error;
  }
};
