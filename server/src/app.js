const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const userRoutes = require("./routes/user");
const pollRoutes = require("./routes/poll");
const chatRoutes = require("./routes/chat");
const API = require("./constants/api");
const errorHandler = require("./middlewares/error-handler");
const PageNotFound = require("./errors/page-not-found-error");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.use(`${API.BASE_URL}${API.USER}`, userRoutes);
app.use(`${API.BASE_URL}${API.POLL}`, pollRoutes);
app.use(`${API.BASE_URL}${API.CHAT}`, chatRoutes);

app.get('/', (req,res,next) =>{
  res.json({
    message: "Welcome to our Poll System App"
  });
})

app.all("*", () => {
  throw new PageNotFound();
});

app.use(errorHandler);

module.exports = app;
