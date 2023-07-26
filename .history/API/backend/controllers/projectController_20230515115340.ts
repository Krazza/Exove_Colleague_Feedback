import { Request, Response } from "express";
import mongoose from "mongoose";
const asyncHandler = require("express-async-handler");
const { User, UserData } = require("../models/projectModels");

//@desc Get all questions
//@route GET /api/questions
//@access Public
export const getItems = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    let collection: any;
    let filter: any;

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
//@route GET /api/questions/:id
//@access Public
export const getAnItem = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    let collection: any;
    let item: any;

    if (collectionName === "questions") {
      collection = User;
    } else if (collectionName === "userData") {
      collection = UserData;
    } else {
      console.log("Data not found");
      return res.status(404).send({ error: 404, message: "Data not found." });
    }

    if (collection === UserData) {
      const items = await collection.findOne({ employeeId: req.params.id });
      if (!items) {
        console.log("Data not found");
        return res.status(404).send({ error: 404, message: "Data not found." });
      }
      res.status(200).json(items);
    } else if (collection === User) {
      const items = await collection.findOne({ uid: req.params.id });
      if (!items) {
        console.log("Data not found");
        return res.status(404).send({ error: 404, message: "Data not found." });
      } else {
        res.status(200).json(items);
      }

      // res.status(400).send({ error: 400, message: "ID is not valid." });
    }
  }
);

//@desc Create a project
//@route POST /api/questions/
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
        console.log("Collection name is not valid");
        res.status(400).send();
    }

    const item = await collection.create(req.body);
    if (!item) {
      console.log("Error in data creation.");
      res.status(500).send({
        error: 500,
        message: "Internal server error. Error in data creation.",
      });
    }
    res.status(201).json(item);
  }
);

//@desc Update a project
//@route PUT /api/questions/:id
//@access Private
export const updateAnItem = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    if (!req.body) {
      console.log("Document body is missing.");
      return res
        .status(400)
        .send({ error: 400, message: "Document body is missing." });
    }

    let collection: any;

    if (collection === User) {
      const item = await collection.findOneAndUpdate(
        { employeeId: req.params.id },
        req.body
      );
    } else if (collection === UserData) {
      const item = await collection.findOneAndUpdate(
        { employeeId: req.params.id },
        req.body
      );
    }
    switch (collectionName) {
      case "questions":
        collection = User;
        const item = await collection.findOneAndUpdate(
          { employeeId: req.params.id },
          req.body
        );
        break;
      case "userData":
        collection = UserData;
        const item = await collection.findOneAndUpdate(
          { uid: req.params.id },
          req.body
        );
        break;
      default:
        console.log("Collection name is not valid");
        res
          .status(400)
          .send({ error: 400, message: "Collection name is not valid" });
    }
    const item = await collection.findOneAndUpdate(
      { employeeId: req.params.id },
      req.body
    );

    if (!item) {
      console.log("Data is not found.");
      res.status(404).send({ error: 404, message: "Data is not found." });
    }

    res.status(200).json(item);
  }
);

//@desc Delete a project
//@route DELETE /api/questions/:id
//@access Private
export const deleteAnItem = asyncHandler(
  async (req: Request, res: Response, collectionName: string) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("ID is not valid.");
      res.status(400).send({ error: 404, message: "ID is not valid." });
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
        console.log("Collection name is not valid.");
        res
          .status(400)
          .send({ error: 400, message: "Collection name is not valid." });
    }

    const item = await collection.findByIdAndDelete(req.params.id);

    if (!item) {
      console.log("Data is not found.");
      res.status(404).send({ error: 404, message: "Data is not found." });
    }

    res.json({
      message: "Data is successfully deleted.",
    });
  }
);
