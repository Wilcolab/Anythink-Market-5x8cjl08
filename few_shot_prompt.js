/**
 * Convert a string to camelCase.
 *
 * Examples:
 *  toCamelCase('first name')    // 'firstName'
 *  toCamelCase('user_id')       // 'userId'
 *  toCamelCase('SCREEN_NAME')   // 'screenName'
 *  toCamelCase('mobile-number') // 'mobileNumber'
 *
 * Rules:
 *  - Splits on any non-alphanumeric characters (spaces, underscores, hyphens, etc.)
 *  - Lowercases the first word, capitalizes first letter of subsequent words and lowercases the rest
 */
function toCamelCase(input) {
    if (!input) return '';

    // Split on any sequence of non-alphanumeric characters, remove empty segments
    const parts = input.split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    const [first, ...rest] = parts;
    const firstWord = first.toLowerCase();
    const camelRest = rest
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');

    return firstWord + camelRest;
}

module.exports = toCamelCase;