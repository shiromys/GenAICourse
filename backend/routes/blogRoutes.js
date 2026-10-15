import express from 'express';
import { getBlogPosts } from '../controllers/blogController.js';

const router = express.Router();

// Public — the /blog page's card grid
router.get('/', getBlogPosts);

export default router;
