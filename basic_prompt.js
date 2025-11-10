/**
 * Convert a string to camelCase.
 * Examples:
 *  toCamelCase("Hello_our World") -> "helloOurWorld"
 *  toCamelCase("  multiple---separators_here ") -> "multipleSeparatorsHere"
 *
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
    if (typeof str !== 'string') return '';

    return str
        .trim()
        // split on any sequence of non-alphanumeric characters
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean)
        .map((word, idx) => {
            const lower = word.toLowerCase();
            if (idx === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

// CommonJS export
module.exports = { toCamelCase };

// ES Module default export (if used in ESM environments)
// export default toCamelCase;