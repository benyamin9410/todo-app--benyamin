import express from "express";
import router from "./src/router/index.js";
import config from "config";
import mongoose from "mongoose";

const app = express();

const port = config.get("port") || 3000;

app.use(express.json());

app.use("/api", router);

const mongoUrl = config.get("mongodbConnection");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB", error);
  });
