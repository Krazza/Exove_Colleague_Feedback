import { Request, Response } from "express";
import mongoose from "mongoose";
const asyncHandler = require("express-async-handler");
const { User, UserData } = require("../models/projectModels");

//@desc Get all projects
//@route GET /api/projects
//@access Public
export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const { collection } = req.params;
  let items: any;

  switch (collection) {
    case "User":
      items = await User.find();
      break;
    case "UserData":
      items = await UserData.find();
      break;
    default:
      console.log("Invalid collection name.");
      res.status(404).send({ error: 404, message: "Invalid collection name." });
  }

  if (!items || items.length === 0) {
    console.log("Data not found");
    res.status(404).send({ error: 404, message: "Data not found." });
  }
  res.status(200).json(items);
});

//@desc Get a project by id
//@route GET /api/projects/:id
//@access Public
export const getAnItem = asyncHandler(async (req: Request, res: Response) => {
  let { collection } = req.params;
  let item: any;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    switch (collection) {
      case "User":
        item = await User.findById(req.params.id);
        break;

      case "UserData":
        item = await UserData.findById(req.params.id);
        break;
      default:
        console.log("Data not found");
        res.status(404).send({ error: 404, message: "Data not found." });
    }
  } else {
    res.status(400).send({ error: 400, message: "ID is not valid." });
  }

  if (!item) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(item);
});

//@desc Create a project
//@route POST /api/projects/
//@access Private
export const createAnItem = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

//@desc Update a project
//@route PUT /api/projects/:id
//@access Private
export const updateAnItem = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

//@desc Delete a project
//@route DELETE /api/projects/:id
//@access Private
export const deleteAnItem = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

// module.exports = {
//   getItems,
//   getAnItem,
//   createAnItem,
//   updateAnItem,
//   deleteAnItem,
// };
