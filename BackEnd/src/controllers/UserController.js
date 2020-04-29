const Users = require("../models/Users");
const random_name = require("node-random-name");

module.exports = {
  async auth(requeste, response) {
    const { email, pwd } = requeste.body;
    const user = await Users.findOne({ username: email, password: pwd });
    return response.json(user);
  },

  async creatUserRandom(requeste, response) {
    const data = {
      username: random_name({ first: true }),
      password: getRndInteger(1000, 10000),
    };
    const user = await Users.create(data);

    return response.json(data);
  },

  async deleteAllUser(requeste, response) {
    const user = await Users.deleteMany(function (req, res) {});

    return response.json(user);
  },
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
