const jwt = require("jsonwebtoken");

const config = require("../configs/config");
const NotAuthorizedError = require("../errors/not-authorised-error");

exports.authorisation = function(req, res, next){
  if (!req?.session?.jwt) {
    return next(new NotAuthorizedError());
  }

  try {
    const payload = jwt.verify(req.session.jwt, config.jwtSecret);
    req.currentUser = payload;
  } catch (err) {
    return next(err);
  }

  next();
};
