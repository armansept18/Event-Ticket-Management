const db = require("../models");
const Entity = require("../entities/entity");

class Event extends Entity {
  constructor(model) {
    super(model);
  }

  getByEventName(req, res) {
    const { eventName } = req.query;
    db.Event.findAll({
      where: ({ eventName } = { [db.Sequelize.Op.like]: `%${eventName}%` }),
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  createEvent(req, res) {
    db.Event.create({ ...req.body })
      .then((result) => res.send({ message: `EVENT CREATED!` }))
      .catch((err) => res.status(500).send(err?.message));
  }
  editEvent(req, res) {
    const { id } = req.params;
    db.Event.update({ ...req.body }, { where: { id } })
      .then((result) =>
        res.send({ message: `EVENT ID ${id} SUCCESSFULLY EDITED!` })
      )
      .catch((err) => res.status(500).send(err?.message));
  }
  getAllEventWithUser(req, res) {
    db.Event.findAll({
      include: { model: db.User, as: user },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
}
module.exports = Event;
