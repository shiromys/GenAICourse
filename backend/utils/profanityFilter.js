/**
 * Lightweight, self-contained profanity filter for user-submitted content
 * (currently: course review comments).
 *
 * This is intentionally a first line of defense, not a complete solution —
 * it catches common profanity and a few basic evasion tricks (symbol swaps
 * like "sh1t", stray punctuation like "f-u-c-k"), but a determined user can
 * still get creative text past any word list. Pair this with a human
 * moderation escape hatch (see courseController.deleteReview, admin-only)
 * for anything that slips through — that combination is the realistic way
 * to handle this, not an unmaintainable, ever-growing blocklist.
 */

// Deliberately a short, representative list of the most commonly-moderated
// terms rather than an exhaustive one — easy to extend if something new
// keeps showing up. Each entry is matched as a whole word only (see below)
// — no wildcard suffix — because a handful of these are also the first few
// letters of completely innocent words ("ass" → "assignment"/"assessment",
// "cock" → "cockpit"), and a false positive that blocks a legitimate review
// is worse than missing an inflected form. Common inflections are listed
// explicitly instead.
const BLOCKED_WORDS = [
    'fuck', 'fucking', 'fucked', 'fucker',
    'shit', 'shitty', 'bullshit',
    'bitch', 'bitchy',
    'asshole', 'assholes', 'ass',
    'bastard',
    'dick', 'dickhead',
    'piss', 'pissed',
    'cunt',
    'cock',
    'pussy',
    'slut', 'slutty',
    'whore',
    'douche', 'douchebag',
    'retard', 'retarded',
    'fag', 'faggot',
    'nigger', 'nigga',
];

const LEET_MAP = { '@': 'a', '4': 'a', '3': 'e', '1': 'i', '!': 'i', '0': 'o', '5': 's', '$': 's' };

const normalize = (text) => {
    let normalized = text.toLowerCase();
    normalized = normalized.replace(/[@4310!5$]/g, (ch) => LEET_MAP[ch] || ch);
    // Drop stray punctuation used to break up a word (f-u-c-k, f.u.c.k) without
    // inserting a space, so letters stay adjacent; real word boundaries
    // (actual spaces) are left alone.
    normalized = normalized.replace(/[^a-z0-9\s]/g, '');
    return normalized;
};

export const containsProfanity = (text = '') => {
    if (!text || typeof text !== 'string') return false;
    const normalized = normalize(text);
    return BLOCKED_WORDS.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(normalized));
};

export default { containsProfanity };
