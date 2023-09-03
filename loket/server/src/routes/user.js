const express = require("express");
const userController = require("../controllers/user");
const route = express.Router();

route.post("/v1", userController.register.bind(userController));
route.post("/v2", userController.login.bind(userController));

module.exports = route;
