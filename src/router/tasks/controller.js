import mongoose from "mongoose";
import _ from "lodash";

import Category from "../../models/category.js";
import Task from "../../models/task.js";
import User from "../../models/user.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      created_by: req.user
    }).populate("categoryId");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }

    const task = await Task.findById(req.params.id)
      .populate("categoryId");

    if (!task || task.created_by.toString() !== req.user.toString()) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const data = _.pick(req.body, [
      "title",
      "categoryId",
      "description",
      "status"
    ]);

    const category = await Category.findById(data.categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    data.created_by = user._id;

    const task = await Task.create(data);
    const result = await task.populate("categoryId");

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }

    const data = _.pick(req.body, [
      "title",
      "categoryId",
      "description",
      "status"
    ]);

    const task = await Task.findById(req.params.id);

    if (!task || task.created_by.toString() !== req.user.toString()) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (data.categoryId) {
      const category = await Category.findById(data.categoryId);

      if (!category) {
        return res.status(404).json({
          message: "Category not found"
        });
      }
    }

    const result = await Task.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true
      }
    ).populate("categoryId");

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID"
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task || task.created_by.toString() !== req.user.toString()) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
