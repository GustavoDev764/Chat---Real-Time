const Messages = require("../models/Messages");
const random_name = require("node-random-name");
const { sendMessages, allConnections } = require("../websocket");

module.exports = {
  async index(requeste, response) {
    const msg = await Messages.find().sort({ date: 1 });
    return response.json(msg);
  },

  async Storage(requeste, response) {
    const { username, message, date } = requeste.body;

    const msg = await Messages.create({
      username,
      message,
      date,
    });

    //console.log(msg);

    const users = allConnections(username);

    // //avisa os outros usuario que tem nova mensagem
    sendMessages(users, "NewMessage", msg);

    return response.json(msg);
  },

  async filterMessages(requeste, response) {
    console.log(requeste.body);
    const { username, data, ordenar, all } = requeste.body;
    let msgs;
    if (all) {
      msgs = await Messages.find().sort({ date: ordenar });
    } else {
      if (data === null) {
        msgs = await Messages.find({ username }).sort({
          date: ordenar,
        });
      } else {
        if (username === null) {
          msgs = await Messages.find({ date: data }).sort({
            date: ordenar,
          });
        } else {
          msgs = await Messages.find({ username, date: data }).sort({
            date: ordenar,
          });
        }
      }
    }

    return response.json(msgs);
  },
  async deleteAll(requeste, response) {
    const msg = await Messages.deleteMany(function (req, res) {});
    return response.json(msg);
  },
  async deleteMessage(requeste, response) {
    const { id } = requeste.body;
    const msg = await Messages.findByIdAndDelete(id);
    return response.json(msg);
  },

  async createOneHundredMessages(requeste, response) {
    const total = 117;
    let data = [];
    for (let index = 0; index < total; index++) {
      data[index] = await Messages.create({
        username: random_name(),
        message: random_name(),
        date: Date.now(),
      });
    }

    return response.json({ msg: "sucess" });
  },
};
