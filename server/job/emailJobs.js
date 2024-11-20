import Agenda from "agenda";
import nodemailer from "nodemailer";
import SendEmail from "../model/email.Model.js";
import dotenv from 'dotenv'

dotenv.config();
const agenda = new Agenda({
  db: {
    address: "mongodb://localhost:27017/emailService",
    collection: "agendaJobs",
  },
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  },
});

console.log(process.env.EMAIL, process.env.EMAILPASSWORD);


// Agenda Job Definition
agenda.define("send email", async (job) => {
  const { emailId } = job.attrs.data;

  try {
    const emailData = await SendEmail.findById(emailId);

    if (emailData && !emailData.sent) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailData.selectedLists, // Assuming selectedLists contains recipient email addresses
        subject: emailData.emailSubject,
        text: emailData.body,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);

      emailData.sent = true; // Mark as sent
      await emailData.save();
    }
  } catch (error) {
    console.error("Error in sending email:", error);
  }
});

// Start Agenda
agenda.start();

export { agenda };
