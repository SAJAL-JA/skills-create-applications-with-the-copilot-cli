"use strict";

/**
 * Calculator library
 * Exposes basic arithmetic functions used by the CLI and tests.
 * Supported operations:
 *  - add(a, b)
 *  - subtract(a, b)
 *  - multiply(a, b)
 *  - divide(a, b)  // throws on division by zero
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
