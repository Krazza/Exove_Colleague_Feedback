import mongoose from "mongoose";
import { Schema } from "mongoose";

const questionnaireSchema = new Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
});

const answeredQuestionnaireSchema = new Schema({
  employeeName: {
    type: String,
    required: true,
  },
  questionnaire: {
    type: [questionnaireSchema],
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  answeredQuestionnaires: [answeredQuestionnaireSchema],
});

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
