import express = require("express");
import { emailTransport } from "../controllers/emailTransport";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const emailBody = {
    to: "vj.kc2007@gmail.com",
    subject: "REMINDER ! Don't forget to give colleague feedback.",
    text: "Hello, After reviewing the system long, we've noticed that you've not sent one or more feedback to colleagues for this period. Please fill in the feedback in Feedback Application before deadline. If you encounter any technical difficulties, turn in to our IT team. Thank you and Regards, Essi.",
  };

  await emailTransport(emailBody);

  res.send({ message: "Email sent successfully." });
});

module.exports = router;
