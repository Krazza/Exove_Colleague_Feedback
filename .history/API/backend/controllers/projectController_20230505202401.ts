import { Request, Response } from "express"; // To solve the TS req, res error
const asyncHandler = require("express-async-handler");
const User = require("../models/projectModels");
const UserData = require("../models/projectModels");
import mongoose from "mongoose";
//@desc Get all projects
//@route GET /api/projects
//@access Public
const getItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await User.find();

  if (!items || items.length === 0) {
    console.log("Data not found");
    res.status(404).send({ error: 404, message: "Data not found." });
  }
  res.status(200).json(items);
});

//@desc Get a project by id
//@route GET /api/projects/:id
//@access Public
const getAnItem = asyncHandler(async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error(`${req.params.id} is not a valid ID.`);
  }
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

//@desc Create a project
//@route POST /api/projects/
//@access Private
const createAnItem = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Name field is required.");
  }

  const user = await User.create(req.body);
  if (!user) {
    res.status(400);
    throw new Error("Project not created.");
  }
  res.status(201).json(user);
});

//@desc Update a project
//@route PUT /api/projects/:id
//@access Private
const updateAnItem = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Name field is required.");
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error(`${req.params.id} is not a valid ID.`);
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.status(200).json(user);
});

//@desc Delete a project
//@route DELETE /api/projects/:id
//@access Private
const deleteAnItem = asyncHandler(async (req: Request, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error(`${req.params.id} is not a valid ID.`);
  }
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("Project is not found.");
  }

  res.json({
    message: `Project with id ${req.params.id} is successfully deleted. Project: ${user}`,
  });
});

module.exports = {
  getItems,
  getAnItem,
  createAnItem,
  updateAnItem,
  deleteAnItem,
};
