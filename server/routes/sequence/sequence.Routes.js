import express from 'express';
import { createEmail } from './../../controller/email/sequence.controller.js';

const router = express.Router();

// Route to create and schedule email
router.post('/send-email', createEmail);

export default router;
