const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 2000;
const cors = require("cors");
const db = require("./models");
const { eventRoutes, userRoutes, carouselRoutes } = require("./routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("WELCOME TO EXPRESS API"));
app.use("/events", eventRoutes);
app.use("/users", userRoutes);
app.use("/carousels", carouselRoutes);

app.listen(PORT, () => {
  console.log(`LISTEN ON PORT ${PORT}`);
  // db.sequelize.sync({ alter: true });
});
