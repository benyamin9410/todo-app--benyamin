import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "./controller.js";

import {
  createCategoryValidation,
  updateCategoryValidation
} from "./validation.js";

import { validationData } from "../../middleware/validation.js";

const category = Router();

category.get("/", getCategories);
category.get("/:id", getCategoryById);

category.post(
  "/",
  createCategoryValidation,
  validationData,
  createCategory
);

category.put(
  "/:id",
  updateCategoryValidation,
  validationData,
  updateCategory
);

category.delete("/:id", deleteCategory);

export default category;
