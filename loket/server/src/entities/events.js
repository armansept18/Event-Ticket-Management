const db = require("../models");
const Entity = require("../entities/entity");
const jwt = require("jsonwebtoken");

class Event extends Entity {
  constructor(model) {
    super(model);
  }
  async editEvent(req, res) {
    const { id } = req.params;
    const eventData = req.body;
    const {token} = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User Not Logged In!" });
    }
    try {
      const dataToken = jwt.verify(token, process.env.jwt_secret); // Define dataToken here

      const existingEvent = await db.Event.findByPk(id);
      if (!existingEvent) {
        return res
          .status(404)
          .json({ message: `Event with ID ${id} not found!` });
      }
      if (existingEvent.userid !== dataToken.id) {
        return res.status(403).json({
          message: `Unauthorized: You are not the owner of this event!`,
        });
      }

      await existingEvent.update({
        ...eventData,
      });
      res.status(200).json({
        message: `Event with ID ${id} successfully edited!`,
        updatedEvent: existingEvent,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error?.message);
    }
  }
  async createEvent(req, res) {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).send("Authentication token required");
    }
    try {
      const dataToken = jwt.verify(token, process.env.jwt_secret);
      const eventData = req.body;

      if (req.file) {
        eventData.imageUrl = req.file.filename;
      }
      eventData.userid = dataToken.id;

      const eventCreate = await db.Event.create(eventData);
      res.status(200).json({
        message: "Event Created!",
        eventCreate,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err?.message);
    }
  }
  async deleteEvent(req, res) {
    const { id } = req.params;
    const {token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User Not Logged In!" });
    }
    try {
      const dataToken = jwt.verify(token, process.env.jwt_secret);
      const existingEvent = await db.Event.findByPk(id);
      if (!existingEvent) {
        return res
          .status(404)
          .json({ message: `Event with ID ${id} not found!` });
      }
      if (existingEvent.userid !== dataToken.id) {
        return res.status(403).json({
          message: `Unauthorized: You are not the owner of this event!`,
        });
      }
      await existingEvent.destroy();
      res
        .status(200)
        .json({ message: `Event with ID ${id} successfully deleted!` });
    } catch (error) {
      console.log(error);
      res.status(500).send(error?.message);
    }
  }

  getAllEventWithUser(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: "user" },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  getEventByUserId(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: "user" },
      where: {
        userid: req.params.userid,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  async createUserAndEvent(req, res) {
    try {
      await db.sequelize.transaction(async (t) => {
        const newUser = await db.User.create(
          { ...req.body.users },
          { transaction: t }
        );
        const events = { ...req.body.events, userid: newUser.dataValues.id };
        await db.Event.create({ ...events }, { transaction: t });
        return res.send({ message: "EVENT AND USER SUCCESSFULLY ADDED!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err?.message });
    }
  }
  getEventByFilter(req, res) {
    const { location, category } = req.query;
    db.Event.findAll({
      where: {
        [db.Sequelize.Op.or]: {
          location: { [db.Sequelize.Op.like]: `%${location}%` },
          category: { [db.Sequelize.Op.like]: `%${category}%` },
        },
      },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
}
module.exports = Event;
