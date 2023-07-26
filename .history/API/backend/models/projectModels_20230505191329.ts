import mongoose from "mongoose";
import { Schema } from "mongoose";

const questionnaireSchema = new Schema({
  questionID: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  sectionID: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  isFreeFrom: {
    type: Boolean,
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

const userDataSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "questions");
module.exports = User;
