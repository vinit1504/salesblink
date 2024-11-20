import Agenda from "agenda";
import nodemailer from "nodemailer";
import SendEmail from "./../model/email.Model.js"; // Ensure correct path for your model

// Set up the Agenda instance for job scheduling
const agenda = new Agenda({
  db: {
    address: "mongodb://localhost:27017/emailService",
    collection: "agendaJobs",
  },
});

// Create a transport instance for sending emails using Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // You can replace this with your preferred email provider
  auth: {
    user: process.env.EMAIL, // Your email here
    pass: process.env.EMAILPASSWORD, // Your email password or app-specific password
  },
});

// Define the Agenda job to send the email
agenda.define("send email", async (job) => {
  const { emailId } = job.attrs.data;

  try {
    // Find the email data in the database by its ID
    const emailData = await SendEmail.findById(emailId);

    if (emailData && !emailData.sent) {
      // Set up the mail options for Nodemailer
      const mailOptions = {
        from: process.env.EMAIL, // Sender's email
        to: emailData.emailAddress, // Recipient's email
        subject: emailData.emailSubject, // Email subject
        text: emailData.body, // Email body content
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      // Mark the email as sent in the database
      emailData.sent = true;
      await emailData.save();
    }
  } catch (error) {
    console.error("Error in sending email:", error);
  }
});

// Export the agenda instance for use in other parts of your application
export { agenda };
