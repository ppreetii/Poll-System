const jwt = require("jsonwebtoken");

const User = require("../models/user");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-requesr-error");
const Password = require("../utils/password");
const config = require("../configs/config");

exports.createUser = async (data) => {
  try {
    const exists = await User.findOne({
      email: data.email,
    });
    if (exists) {
      throw new BadRequestError("User already registered");
    }
    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await user.save();

    return sanitizeUser(user);
  } catch (error) {
    throw error;
  }
};

exports.login = async (data) => {
  try {
    const user = await User.findOne({
      email: data?.email,
    });
    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    const isMatch = await Password.compare(user.password, data?.password);
    if (!isMatch) {
      throw new BadRequestError("Password is wrong");
    }

    const jwt = generateToken({
      id: user._id,
      email: user.email,
    });

    return {
      jwt,
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
};

function sanitizeUser(user) {
  return {
    name: user.name,
    email: user.email,
    polls: user.polls,
  };
}

function generateToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
}
