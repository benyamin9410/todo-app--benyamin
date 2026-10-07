import { Router } from "express";
import Authorization from "../../middleware/auth.js";
import User from "../../models/user.js";

const user = Router();

user.use(Authorization);

user.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

export default user;
