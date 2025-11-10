/**
 * Convert a string to kebab-case (spaces → hyphens, all lowercase).
 * Returns an Error object for invalid input (null/undefined/non-string).
 *
 * Example:
 *   toKebabCase("Hello World") // "hello-world"
 *   toKebabCase(null)         // Error
 */
function toKebabCase(input) {
    if (input === null || input === undefined || typeof input !== 'string') {
        throw new Error('Invalid input: expected a non-null string.');
    }

    // Collapse consecutive whitespace, trim ends, replace spaces with hyphens, and lowercase.
    return input
        .trim()
        .split(/\s+/)
        .join('-')
        .toLowerCase();
}

module.exports = toKebabCase;