const express = require("express");
const eventControllers = require("../controllers/event");
const route = express.Router();

route.get("/", eventControllers.getAll.bind(eventControllers));
route.get("/name", eventControllers.getByEventName.bind(eventControllers));
route.get(
  "/users",
  eventControllers.getAllEventWithUser.bind(eventControllers)
);
route.get("/:id", eventControllers.getById.bind(eventControllers));


route.post("/", eventControllers.createEvent.bind(eventControllers));
route.patch("/:id", eventControllers.editEvent.bind(eventControllers));
route.delete("/:id", eventControllers.deleteById.bind(eventControllers));


module.exports = route;
