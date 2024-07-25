const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const ensureAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, keys.jwtSecret, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });

    req.user = decoded.id;
    next();
  });
};

module.exports = { ensureAuth };
