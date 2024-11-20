import SendEmail from "../../model/email.Model.js";
import { agenda } from "../../job/emailJobs.js";

// Controller to handle email creation and scheduling
export const createEmail = async (req, res) => {
  try {
    const { time, emailSubject, body, selectedLists } = req.body;

    // Create and save email document
    const newEmail = new SendEmail({
      time,
      emailSubject,
      body,
      selectedLists,
    });
    const savedEmail = await newEmail.save();

    // Schedule the email to be sent using Agenda
    agenda.schedule(new Date(time), "send email", { emailId: savedEmail._id });

    return res.status(201).json({
      message: "Email scheduled successfully",
      email: savedEmail,
    });
  } catch (error) {
    console.error("Error scheduling email:", error);
    return res.status(500).json({ message: "Failed to schedule email" });
  }
};
