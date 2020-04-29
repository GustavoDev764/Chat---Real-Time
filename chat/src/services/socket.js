import socketio from "socket.io-client";

const socket = socketio("http://localhost:4000/", {
  autoConnect: false,
});

function connect(data = []) {
  socket.io.opts.query = data;
  socket.connect();

  socket.on("message", (text) => {
    console.log(text);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
    console.log("WebSocket Disconect");
  }
}

async function subscribeToNewMessage(subscribeFunction) {
  await socket.on("NewMessage", subscribeFunction);
}

export { connect, disconnect, subscribeToNewMessage };
