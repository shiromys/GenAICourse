import express from 'express';
import { handleContactForm } from '../controllers/contactController.js';

const router = express.Router();

/**
 * Contact Routes
 */

router.post('/', handleContactForm);

export default router;
