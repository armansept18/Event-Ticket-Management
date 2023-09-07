const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const data = jwt.verify(token.process.env.jwt_secret);
    if(data.id != req.query.userid) throw new Error (`Invalid User!`);
    next();
  } catch (error) {
    return res.status(401).send(err?.message);
  }
};

module.exports = verifyToken;
