import Settings from '../models/Settings.js';

/**
 * Maintenance-mode gate.
 *
 * Mounted in server.js AFTER /api/settings, /api/auth and /api/admin are mounted, so those
 * three stay reachable no matter what (settings so the frontend can poll status, auth so an
 * admin can log in, admin because it already self-protects with protect+authorize('admin')).
 * Every route mounted after this middleware is blocked with a 503 while maintenance mode is on.
 */
const maintenanceGate = async (req, res, next) => {
    try {
        const settings = await Settings.getGlobal();
        if (!settings.maintenanceMode) return next();

        return res.status(503).json({
            success: false,
            maintenanceMode: true,
            message: settings.maintenanceMessage || 'The site is temporarily down for maintenance.'
        });
    } catch (error) {
        // A broken settings lookup should never be the reason the whole API goes down —
        // fail open and let the request through.
        return next();
    }
};

export default maintenanceGate;
