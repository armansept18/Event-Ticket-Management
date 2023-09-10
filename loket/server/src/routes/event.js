const express = require("express");
const eventControllers = require("../controllers/event");
const check_verified = require("../middlewares/auth");
const uploadFile = require("../middlewares/multer");
const verifyToken1 = require("../middlewares/auth");
const route = express.Router();

route.get("/", eventControllers.getAll.bind(eventControllers));
route.get("/search", eventControllers.getEventByFilter.bind(eventControllers));
route.get(
  "/users",
  eventControllers.getAllEventWithUser.bind(eventControllers)
);
route.get("/user/:userid", eventControllers.getEventByUserId);
route.get("/:id", eventControllers.getById.bind(eventControllers));

route.post(
  "/",
  check_verified,
  uploadFile({
    destinationFolder: "event",
    prefix: "new-event",
    filetype: "image",
  }).single("image"),
  eventControllers.createEvent.bind(eventControllers)
);
route.patch(
  "/:id",
  check_verified,
  uploadFile({
    destinationFolder: "event",
    prefix: "new-event",
    filetype: "image",
  }).single("image"),
  eventControllers.editEvent.bind(eventControllers)
);
route.delete("/:id", check_verified, eventControllers.deleteEvent.bind(eventControllers));

module.exports = route;
