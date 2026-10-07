import jwt from "jsonwebtoken";
import config from "config";
import User from "../models/user.js";

export default async function Authorization(req, res, next) {
  try {
    const token = req.headers.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const verify = jwt.verify(token, config.get("jwt_secret"));
    const user = await User.findById(verify.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
