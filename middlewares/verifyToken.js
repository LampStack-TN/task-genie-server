const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization ;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "invalid Authorization header." });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      req.userId = decoded.userId;
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "failed." });
  }
};

module.exports = verifyToken;
