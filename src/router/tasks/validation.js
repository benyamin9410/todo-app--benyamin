import { body } from "express-validator";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),

  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),

  body("categoryId")
    .notEmpty()
    .withMessage("categoryId is required"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("status must be a boolean")
];

export const updateTaskValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("title must be a string"),

  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),

  body("categoryId")
    .optional(),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("status must be a boolean")
];
