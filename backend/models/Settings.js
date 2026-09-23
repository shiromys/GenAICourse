import mongoose from 'mongoose';

/**
 * Settings Model
 * A single singleton document (key: 'global') holding site-wide operational
 * toggles that admins control from the dashboard — currently maintenance mode.
 * Always look it up by { key: 'global' }; use Settings.getGlobal() to fetch-or-create it.
 */
const settingsSchema = new mongoose.Schema({
    key: {
        type: String,
        default: 'global',
        unique: true
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    maintenanceMessage: {
        type: String,
        trim: true,
        default: "We're doing some scheduled maintenance right now. Please check back shortly."
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

settingsSchema.statics.getGlobal = async function () {
    let doc = await this.findOne({ key: 'global' });
    if (!doc) {
        doc = await this.create({ key: 'global' });
    }
    return doc;
};

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
