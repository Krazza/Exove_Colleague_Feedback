import { Request, Response } from "express";
import mongoose from "mongoose";
const asyncHandler = require("express-async-handler");
const { User, UserData } = require("../models/projectModels");

//@desc Get all projects
//@route GET /api/projects
//@access Public
export const getItems = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    let collection: any;

    switch (collectionName) {
      case "questions":
        collection = User;
        break;
      case "userData":
        collection = UserData;
        break;
      default:
        console.log("Invalid collection name or does not exist.");
        return res.status(404).send({
          error: 404,
          message: "Invalid collection name or does not exist.",
        });
    }

    const items = await collection.find();

    if (!items || items.length === 0) {
      console.log("Data not found");
      return res.status(404).send({ error: 404, message: "Data not found." });
    }
    res.status(200).json(items);
  }
);

//@desc Get a project by id
//@route GET /api/projects/:id
//@access Public
export const getAnItem = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    let collection: any;
    let item: any;

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      switch (collectionName) {
        case "questions":
          collection = User;
          break;

        case "userData":
          collection = UserData;
          break;
        default:
          console.log("Data not found");
          res.status(404).send({ error: 404, message: "Data not found." });
      }
    } else {
      res.status(400).send({ error: 400, message: "ID is not valid." });
    }

    const items = await collection.find();

    if (!items || items.length === 0) {
      console.log("Data not found");
      return res.status(404).send({ error: 404, message: "Data not found." });
    }
    res.status(200).json(items);
  }
);

//@desc Create a project
//@route POST /api/projects/
//@access Private
export const createAnItem = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    if (!req.body) {
      console.log("Document body is missing.");
      return res
        .status(400)
        .send({ error: 400, message: "Document body is missing." });
    }

    let collection: any;

    switch (collectionName) {
      case "questions":
        collection = User;
        break;
      case "userData":
        collection = UserData;
        break;
      default:
        console.log("Error in data creation.");
    }

    const item = await collection.create(req.body);
    if (!item) {
      console.log("Error in data creation.");
      res.status(400).send({ error: 400, message: "Error in data creation." });
    }
    res.status(201).json(item);
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
