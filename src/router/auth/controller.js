import _ from "lodash";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export const register = async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);

    const exist = await User.findOne({ email: body.email });

    if (exist) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    body.password = await bcrypt.hash(body.password, 10);

    const newUser = await User.create(body);

    res.status(201).json({
      message: "User created",
      data: _.pick(newUser, ["email"])
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);

    const exist = await User.findOne({ email: body.email });

    if (!exist) {
      return res.status(400).json({
        message: "Invalid data"
      });
    }

    const check = await bcrypt.compare(body.password, exist.password);

    if (!check) {
      return res.status(400).json({
        message: "Invalid data"
      });
    }

    const payload = {
      id: exist.id
    };

    const token = jwt.sign(payload, config.get("jwt_secret"));

    res.json({
      message: "Login completed",
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
