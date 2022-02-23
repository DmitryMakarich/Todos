import config from "config";
import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authorization = req.header("Authorization");
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.userId;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

export default auth;
