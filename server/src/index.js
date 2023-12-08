const app = require("./app");
const mongoose = require("mongoose");
const config = require("./configs/config");

mongoose.connect(config.mongoUrl).then(() => {
  console.log("Database Connected!");
  const server = app.listen(config.port);
  console.log("Listening on port", config.port);
  const io = require("./socket").init(server);
  io.on("connection", (socket) => {
    console.log("Socket Connection to Client Successful!");
  });
});
