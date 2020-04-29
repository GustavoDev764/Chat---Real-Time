const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const routes = require("./router");
const { setupWebSocket } = require("./websocket");

const app = express();
const server = http.Server(app);
setupWebSocket(server);

mongoose.connect(
  "mongodb+srv://estagio:estagio@cluster0-mt8nj.mongodb.net/chat?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(4000);
