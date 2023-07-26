import nodemailer from "nodemailer";
import express from "express";

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

interface EmailData {
  to: string;
  subject: string;
  text: string;
}

export const emailTransport = async (emailData: EmailData) => {
  try {
    const { to, subject, text } = emailData;

    // Configure email options
    const mailOptions = {
      from: "vj.kc2007@gmail.com",
      to,
      subject,
      text,
    };

    // Send email using transporter
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
  }
};
