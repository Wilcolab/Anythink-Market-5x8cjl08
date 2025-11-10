/**
 * Convert an arbitrary string into lower camelCase (example: "firstName").
 *
 * Behavior summary:
 * - Trims leading and trailing whitespace.
 * - If the trimmed string is empty, returns an empty string.
 * - If input contains non-alphanumeric separators (spaces, underscores, hyphens, dots, etc.),
 *   the string is split on any run of non-alphanumeric characters and those tokens are used
 *   to build the camelCase result.
 * - If the input contains no separators, the function attempts to split existing identifiers
 *   into logical tokens (camelCase, PascalCase, ALLCAPS acronyms, and numbers) using a
 *   regular expression. This preserves common acronym boundaries when reasonable:
 *     - "XMLHttpRequest" -> ["XML", "Http", "Request"] -> "xmlHttpRequest"
 *     - "SCREEN_NAME"    -> ["SCREEN", "NAME"] -> "screenName"
 * - Numbers are treated as tokens and preserved as-is: "item42Count" -> "item42Count".
 *
 * Algorithm details:
 * - Uses a tokenization approach:
 *     - If separators are present, split on runs of non-alphanumeric characters.
 *     - Otherwise, apply a regex that captures:
 *         1) sequences of uppercase letters followed by an Upper+lower (acronym prefix),
 *         2) optional single uppercase followed by lowercase letters (normal words),
 *         3) sequences of uppercase letters (trailing acronyms),
 *         4) sequences of digits.
 * - The first token is lowercased entirely. Subsequent tokens are capitalized such that
 *   the first character is uppercase and the rest are lowercased, except numeric tokens
 *   which are left unchanged.
 *
 * Edge cases and notes:
 * - Leading/trailing separators and repeated separators are ignored (they produce no empty tokens).
 * - Preserves numbers and places them directly in the resulting identifier.
 * - Attempts to keep acronyms readable by converting an initial acronym to lowercase only
 *   for the first token but capitalizing later acronym-like tokens into TitleCase segments.
 *
 * Examples:
 *   toCamelCase("first name")      -> "firstName"
 *   toCamelCase("user_id")         -> "userId"
 *   toCamelCase("SCREEN_NAME")     -> "screenName"
 *   toCamelCase("mobile-number")   -> "mobileNumber"
 *   toCamelCase("XMLHttpRequest")  -> "xmlHttpRequest"
 *   toCamelCase("item 42 count")   -> "item42Count"
 *
 * @param {string} input - The string to convert to camelCase.
 * @returns {string} A lower camelCase representation of the input string. Returns an empty
 *                   string for inputs that are empty or only whitespace after trimming.
 * @throws {TypeError} If input is null or undefined, or if input is not of type string.
 * @example
 * // Basic use
 * toCamelCase("first name"); // -> "firstName"
 *
 * @example
 * // Preserves numbers and acronyms reasonably
 * toCamelCase("API_response_200OK"); // -> "apiResponse200Ok"
 *
 * @see toDotCase
 */

/**
 * Convert an arbitrary string into dot.case (lowercase tokens separated by dots).
 *
 * Behavior summary:
 * - Trims leading and trailing whitespace.
 * - If the trimmed string is empty, returns an empty string.
 * - If the string contains non-alphanumeric separators (spaces, underscores, hyphens, dots, etc.),
 *   the string is split on any run of non-alphanumeric characters and the resulting tokens
 *   are lowercased and joined with '.'.
 * - If the input contains no separators, the function applies the same tokenization logic
 *   as toCamelCase to split camelCase, PascalCase, ALLCAPS acronyms, and numbers into logical
 *   tokens.
 * - Numbers are preserved as tokens and included in the dot-separated output.
 *
 * Algorithm details:
 * - Uses a tokenization approach:
 *     - If separators are present, split on runs of non-alphanumeric characters.
 *     - Otherwise, apply a regex that captures acronym prefixes, normal words, trailing acronyms,
 *       and numbers to obtain tokens.
 * - All tokens are converted to lowercase and joined by '.' to form the final string.
 *
 * Edge cases and notes:
 * - Multiple adjacent separators produce no empty tokens in the output.
 * - Acronyms are lowercased (e.g., "XMLHTTP" -> "xmlhttp" or split into ["XML","HTTP"] -> "xml.http"
 *   depending on the tokenization), which is consistent with typical dot.case usage.
 * - Numbers remain intact and become individual dot-separated tokens when appropriate.
 *
 * Examples:
 *   toDotCase("first name")       -> "first.name"
 *   toDotCase("user_id")          -> "user.id"
 *   toDotCase("SCREEN_NAME")      -> "screen.name"
 *   toDotCase("mobile-number")    -> "mobile.number"
 *   toDotCase("XMLHttpRequest")   -> "xml.http.request"
 *   toDotCase("item42Count")      -> "item.42.count"
 *
 * @param {string} input - The string to convert to dot.case.
 * @returns {string} A dot.case (lowercase, dot-separated) representation of the input string.
 * @throws {TypeError} If input is null or undefined, or if input is not of type string.
 * @example
 * // Basic use
 * toDotCase("first name"); // -> "first.name"
 *
 * @example
 * // Mixed input with numbers and separators
 * toDotCase("API_response_200OK"); // -> "api.response.200.ok"
 *
 * @see toCamelCase
 */

    /**
     * Convert an arbitrary string into lower camelCase (example: "firstName").
     *
     * @param {string} input - The string to convert to camelCase.
     * @returns {string} A lower camelCase representation of the input string.
     * @throws {TypeError} If input is null or undefined, or if input is not of type string.
     */
    function toCamelCase(input) {
        if (input === null || input === undefined) {
            throw new TypeError('toCamelCase: input must be a string, received null/undefined');
        }
        if (typeof input !== 'string') {
            throw new TypeError(`toCamelCase: expected string but received ${typeof input}`);
        }
    
        const str = input.trim();
        if (str === '') return '';
    
        // If the string contains separators, split on any non-alphanumeric sequence.
        const hasSeparators = /[^A-Za-z0-9]+/.test(str);
        let parts = [];
    
        if (hasSeparators) {
            parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
        } else {
            // Split camelCase, PascalCase, acronyms, and numbers into logical tokens.
            // Matches:
            //  - consecutive uppercase letters followed by an uppercase+lowercase (acronym before normal word)
            //  - optional single uppercase + lowercase sequence
            //  - consecutive uppercase letters (acronyms at end)
            //  - numbers
            const tokenRe = /([A-Z]+(?=[A-Z][a-z]))|([A-Z]?[a-z]+)|([A-Z]+)|([0-9]+)/g;
            parts = str.match(tokenRe) || [str];
        }
    
        if (parts.length === 0) return '';
    
        const lower = (s) => s.toLowerCase();
        const capitalize = (s) => (s.length === 0 ? '' : s[0].toUpperCase() + s.slice(1).toLowerCase());
    
        const first = lower(parts[0]);
        const rest = parts
            .slice(1)
            .map((p) => (/^[0-9]+$/.test(p) ? p : capitalize(p)))
            .join('');
    
        return first + rest;
    }
        //  - consecutive uppercase letters (acronyms at end)
        //  - numbers
        const tokenRe = /([A-Z]+(?=[A-Z][a-z]))|([A-Z]?[a-z]+)|([A-Z]+)|([0-9]+)/g;
        parts = str.match(tokenRe) || [str];
    }

    if (parts.length === 0) return '';

    const lower = (s) => s.toLowerCase();
    const capitalize = (s) => (s.length === 0 ? '' : s[0].toUpperCase() + s.slice(1).toLowerCase());

    const first = lower(parts[0]);
    const rest = parts
        .slice(1)
        .map((p) => (/^[0-9]+$/.test(p) ? p : capitalize(p)))
        .join('');

    return first + rest;
}

export default toCamelCase;

/**
 * Convert a string to dot.case.
 *
 * Handles:
 * - separators (spaces, underscores, hyphens, dots, etc.)
 * - existing camelCase / PascalCase
 * - ALLCAPS and acronyms
 * - numbers inside strings (kept as-is)
 *
 * Throws:
 * - TypeError if the input is not a string
 *
 * @param {string} input
 * @returns {string}
 */
export function toDotCase(input) {
    if (input === null || input === undefined) {
        throw new TypeError('toDotCase: input must be a string, received null/undefined');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`toDotCase: expected string but received ${typeof input}`);
    }

    const str = input.trim();
    if (str === '') return '';

    const hasSeparators = /[^A-Za-z0-9]+/.test(str);
    let parts = [];

    if (hasSeparators) {
        parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
    } else {
        const tokenRe = /([A-Z]+(?=[A-Z][a-z]))|([A-Z]?[a-z]+)|([A-Z]+)|([0-9]+)/g;
        parts = str.match(tokenRe) || [str];
    }

    return parts.map((p) => p.toLowerCase()).join('.');
}
