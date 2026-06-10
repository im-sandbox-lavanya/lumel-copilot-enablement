/**
 * utils.js
 * A collection of small utility functions used across the app.
 * This file is intentionally simple so Copilot CLI exercises are easy to follow.
 */

/**
 * Greets a user by name.
 * @param {string} name - The user's name
 * @returns {string} A greeting message
 */
function greet(name) {
  return `Hello, ${name}! Welcome to the Copilot CLI demo.`;
}

/**
 * Calculates the sum of an array of numbers.
 * @param {number[]} numbers
 * @returns {number}
 */
function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

/**
 * Checks whether a number is even.
 * @param {number} n
 * @returns {boolean}
 */
function isEven(n) {
  return n % 2 === 0;
}

/**
 * Reverses a string.
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
  return str.split("").reverse().join("");
}

module.exports = { greet, sum, isEven, reverseString };
