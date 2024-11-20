import SendEmail from './../../model/email.Model.js';
import { agenda } from './../../job/emailJobs.js';  // Import the agenda instance

// Controller to handle POST request for creating email and scheduling it
export const createEmail = async (req, res) => {
  try {
    const { time, emailSubject, body, selectedLists } = req.body;

    // Create the email record
    const newEmail = new SendEmail({
      time,
      emailSubject,
      body,
      selectedLists,
    });

    // Save email record to database
    const savedEmail = await newEmail.save();

    // Schedule the email job with Agenda to run at the specified time
    agenda.schedule(new Date(time), 'send email', { emailId: savedEmail._id });

    return res.status(201).json({
      message: 'Email scheduled successfully',
      email: savedEmail
    });
  } catch (error) {
    console.error('Error in creating email:', error);
    return res.status(500).json({ message: 'Failed to create email' });
  }
};

