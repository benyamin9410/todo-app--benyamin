import { Router } from "express";

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "./controller.js";

import {
  createTaskValidation,
  updateTaskValidation
} from "./validation.js";

import { validationData } from "../../middleware/validation.js";
import Authorization from "../../middleware/auth.js";

const task = Router();

task.get("/", Authorization, getAllTasks);

task.get("/:id", Authorization, getTaskById);

task.post(
  "/",
  Authorization,
  createTaskValidation,
  validationData,
  createTask
);

task.put(
  "/:id",
  Authorization,
  updateTaskValidation,
  validationData,
  updateTask
);

task.delete(
  "/:id",
  Authorization,
  deleteTask
);

export default task;
