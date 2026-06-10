/**
 * index.js
 * Entry point for the demo project.
 * Run it with: node src/index.js
 */

const { greet, sum, isEven, reverseString } = require("./utils");

console.log(greet("Developer"));
console.log("Sum of [1,2,3,4,5]:", sum([1, 2, 3, 4, 5]));
console.log("Is 4 even?", isEven(4));
console.log("Reverse of 'copilot':", reverseString("copilot"));
