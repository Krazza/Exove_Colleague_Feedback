import mongoose from "mongoose";
import { Schema } from "mongoose";

/* For Questionnaires */

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
  isFreeForm: {
    type: Boolean,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const sectionSchema = new Schema({
  sectionID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  answers: {
    type: [questionnaireSchema],
    required: true,
  },
});

const answeredQuestionnaireSchema = new Schema({
  employeeUid: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  questionnaire: {
    type: [sectionSchema],
    required: true,
  },
});

const feedbackManager = new Schema({
  supervisorId: {
    type: String,
    requird: true,
  },
  supervisorFirstName: {
    type: String,
    required: true,
  },
  supervisorLastName: {
    type: String,
    required: false,
  },
  supervisorEmail: {
    type: String,
    required: false,
  },
})

const feedbackRequest = new Schema({
  colleagueName: {
    type: String,
    required: true
  },
  colleagueUid: {
    type: String,
    require: true
  },
  managerList: [feedbackManager]
})

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
  feedbackRequests: [feedbackRequest],
  answeredQuestionnaires: [answeredQuestionnaireSchema],
});

// const User = mongoose.model("User", userSchema, "questions");
// module.exports = User;

/* For User Data */

const managerDataSchema = new Schema({
  supervisorId: {
    type: String,
    requird: true,
  },
  supervisorFirstName: {
    type: String,
    required: true,
  },
  supervisorLastName: {
    type: String,
    required: true,
  },
  supervisorEmail: {
    type: String,
    required: true,
  },
});

const workDataSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
});
// const feedbackApprovalSchema = new Schema({
//   selectedColleague: [String],
// });

const userDataSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
  honorific: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  shortBirthDate: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  work: [workDataSchema],
  reportsTo: [managerDataSchema],
  feedbackRequests: [feedbackRequest]
});

module.exports = {
  User: mongoose.model("questions", userSchema),
  UserData: mongoose.model("userData", userDataSchema),

};




