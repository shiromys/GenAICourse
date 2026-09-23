import Settings from '../models/Settings.js';

/**
 * @desc    Public status check — used by the frontend to decide whether to show
 *          the maintenance page. Deliberately unauthenticated and minimal.
 * @route   GET /api/settings/status
 * @access  Public
 */
export const getPublicStatus = async (req, res, next) => {
    try {
        const settings = await Settings.getGlobal();
        res.status(200).json({
            success: true,
            data: {
                maintenanceMode: settings.maintenanceMode,
                maintenanceMessage: settings.maintenanceMessage
            }
        });
    } catch (error) {
        // Never let a settings lookup failure take the whole site down —
        // fail open (maintenanceMode: false) rather than 500ing every page load.
        res.status(200).json({
            success: true,
            data: { maintenanceMode: false, maintenanceMessage: '' }
        });
    }
};

/**
 * @desc    Toggle maintenance mode on/off, optionally set the message (Admin only)
 * @route   PUT /api/admin/settings/maintenance
 * @access  Private/Admin
 */
export const updateMaintenanceMode = async (req, res, next) => {
    try {
        const { maintenanceMode, maintenanceMessage } = req.body;

        const settings = await Settings.getGlobal();
        if (typeof maintenanceMode === 'boolean') settings.maintenanceMode = maintenanceMode;
        if (typeof maintenanceMessage === 'string' && maintenanceMessage.trim()) {
            settings.maintenanceMessage = maintenanceMessage.trim();
        }
        settings.updatedBy = req.user._id;
        await settings.save();

        res.status(200).json({
            success: true,
            message: `Maintenance mode is now ${settings.maintenanceMode ? 'ON' : 'OFF'}`,
            data: {
                maintenanceMode: settings.maintenanceMode,
                maintenanceMessage: settings.maintenanceMessage
            }
        });
    } catch (error) {
        next(error);
    }
};
