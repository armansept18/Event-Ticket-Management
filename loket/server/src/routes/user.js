const express = require("express");
const userController = require("../controllers/user");
const route = express.Router();

route.get("/", userController.getAll.bind(userController));
route.get("/:id", userController.getById.bind(userController));
route.post("/v1", userController.register.bind(userController));
route.post("/v2", userController.login.bind(userController));

module.exports = route;
