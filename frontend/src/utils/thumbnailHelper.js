/**
 * Safely processes a thumbnail URL for use in img src attributes.
 * - Strips localhost/127.0.0.1 prefixes from seeded data
 * - Encodes special characters (spaces, etc.) in relative paths
 * - Returns a fallback URL if thumbnail is missing
 */
export const getSafeThumbnailUrl = (thumbnail, fallback = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800') => {
    if (!thumbnail) return fallback;

    let url = thumbnail;

    // Strip localhost/127.0.0.1 from seeded URLs
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        try {
            const parsed = new URL(url);
            url = parsed.pathname;
        } catch (e) {
            // Not a valid URL, use as-is
        }
    }

    // Encode spaces and special characters in relative paths
    if (url.startsWith('/') && !url.startsWith('//')) {
        try {
            url = encodeURI(url);
        } catch (e) {
            return fallback;
        }
    }

    return url;
};
