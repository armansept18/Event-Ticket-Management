const express = require("express");
const eventControllers = require("../controllers/event");
const route = express.Router();

route.get("/", eventControllers.getAll);
route.get("/name", eventControllers.getByEventName);
route.get("/users", eventControllers.getAllEventWithUser);
route.get("/:id", eventControllers.getById);

route.post("/", eventControllers.createEvent);
route.patch("/:id", eventControllers.editEvent, eventControllers.getById);
route.delete("/:id", eventControllers.deleteEvent);

module.exports = route;
