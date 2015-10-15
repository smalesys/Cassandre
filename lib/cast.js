/*
 * Function to cast properly a single string.
 *
 * Dates not are handled currently due to
 * the number of possible formats.
 *
 */

// Regular expressions for the different types
var integer = /^[+-]?\d+$/;
var decimal = /^[+-]?\d+\.\d+$/;

module.exports = function (string) {

    if (integer.test(string)) {
        return parseInt(string);
    }

    if (decimal.test(string)) {
        return parseFloat(string);
    }

    if (string === "true") {
        return true;
    }

    if (string === "false") {
        return false;
    }

    return string;
}