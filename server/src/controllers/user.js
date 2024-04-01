const userServices = require("../services/user");

exports.createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userServices.createUser(data);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = req.body;
    const loginId = req.currentUser?.id;
    const result = await userServices.login(data);
    req.session = {
      jwt: result.jwt,
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session = null;
    res.json({});
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req, res, next) => {
  res.send({
    currentUser: req.currentUser ?? null,
  });
};
