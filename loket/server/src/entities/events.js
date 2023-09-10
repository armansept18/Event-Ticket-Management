const db = require("../models");
const Entity = require("../entities/entity");
const jwt = require("jsonwebtoken");

class Event extends Entity {
  constructor(model) {
    super(model);
  }
  editEvent(req, res) {
    const { id } = req.params;
    const eventData = req.body;
    if (req?.file?.filename) {
      eventData.imageUrl = req.file.filename;
    }
    db.Event.update({ ...req.body }, { where: { id } })
      .then((result) =>
        res.send({ message: `Event ID ${id} Successfully Edited!` })
      )
      .catch((err) => res.status(500).send(err?.message));
  }

  async createEvent(req, res) {
    const { token } = req;
    const dataToken = jwt.verify(token, process.env.jwt_secret);
    const eventData = req.body;
    if (req?.file?.filename) {
      eventData.imageUrl = req.file.filename;
    }
    try {
      const eventCreate = await db.Event.create({
        ...eventData,
        userid: dataToken.id,
      }).then((result) => result);
      console.log(eventData);
      res.status(200).json({
        message: "Event Created!",
        eventCreate,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err?.message);
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
