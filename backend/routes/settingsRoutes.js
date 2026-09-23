import express from 'express';
import { getPublicStatus } from '../controllers/settingsController.js';

const router = express.Router();

// Public — the frontend polls this to decide whether to show the maintenance page.
// The admin-only toggle itself lives under /api/admin/settings/maintenance (adminRoutes.js),
// so it's covered by the existing protect+authorize('admin') chain there.
router.get('/status', getPublicStatus);

export default router;
