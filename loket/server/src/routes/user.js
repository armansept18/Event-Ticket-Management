const express = require("express");
const userControllers = require("../controllers/user");
const route = express.Router();

route.get("/", userControllers.getAll);
route.get("/:id", userControllers.getById);
route.post("/", userControllers.createUser);
route.delete("/:id", userControllers.deleteUser);

module.exports = route;
