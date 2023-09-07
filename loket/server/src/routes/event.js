const express = require("express");
const eventControllers = require("../controllers/event");
const route = express.Router();

route.get("/", eventControllers.getAll);
route.get("/search", eventControllers.getEventByFilter);
route.get("/users", eventControllers.getAllEventWithUser);
route.get("/user/:userid", eventControllers.getEventByUserId);
route.get("/:id", eventControllers.getById);

route.post("/", eventControllers.createEvent);
route.post("/user-event", eventControllers.createUserAndEvent);
route.patch("/:id", eventControllers.editEvent, eventControllers.getById);
route.delete("/:id", eventControllers.deleteEvent);

module.exports = route;
