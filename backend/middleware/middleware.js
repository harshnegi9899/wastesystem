const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, "badsecret");
    req.user = decoded.userId;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
