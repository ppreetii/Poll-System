const chatServices = require("../services/chat");

exports.createChat = async (req, res, next) => {
  try {
    const loginId = req.currentUser?.id;
    const chat = await chatServices.createChat(loginId, req.body);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};
