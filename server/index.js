const express = require("express");
const socket = require("socket.io");
const app = express();
const server = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(server));

server.listen(8080, function() {
  console.log("server is running on port 8080");
});
app.use(express.static(__dirname + "../../build"));

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build"));
});
