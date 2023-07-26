import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema, "questions");
// defining model, schema and db collection
