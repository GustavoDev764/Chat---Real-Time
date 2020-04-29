const socketio = require("socket.io");

let io;
const connection = [];

exports.setupWebSocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    console.log(socket.id);
    console.log(socket.handshake.query);

    const { username } = socket.handshake.query;

    setTimeout(() => {
      socket.emit("message", "WebSocket Connected");
    }, 300);

    connection.push({
      id: socket.id,
      username: username,
    });
  });
};

exports.allConnections = (username) => {
  let data = [];
  connection.forEach((element, index) => {
    if (element.username !== username) {
      data[index] = element;
    }
  });
  return connection;
};

exports.sendMessages = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};
