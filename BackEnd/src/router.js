const { Router } = require("express");
const routes = Router();
const MessageControlle = require("./controllers/MessageController");
const UserController = require("./controllers/UserController");

routes.get("/", MessageControlle.index);

routes.post("/messages", MessageControlle.Storage);
routes.get("/deleteAll", MessageControlle.deleteAll);
routes.get("/createMessages", MessageControlle.createOneHundredMessages);
routes.post("/filterMessages", MessageControlle.filterMessages);
routes.post("/deleteMessage", MessageControlle.deleteMessage);

routes.get("/creatUserRandom", UserController.creatUserRandom);
routes.get("/deleteAllUsers", UserController.deleteAllUser);
routes.post("/authUser", UserController.auth);

module.exports = routes;
