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

function modulo(a, b) {
  return a % b;
}

function potencia(base, exponente) {
  return Math.pow(base, exponente);
}

// English alias for external tests/consumers
function power(base, exponent) {
  return potencia(base, exponent);
}

function raizCuadrada(n) {
  if (n < 0) {
    throw new Error('cannot take square root of negative number');
  }
  return Math.sqrt(n);
}

// Provide both camelCase and lowercase aliases for compatibility with tests
function squareRoot(n) {
  return raizCuadrada(n);
}
function squareroot(n) {
  return raizCuadrada(n);
}

module.exports = { add, subtract, multiply, divide, modulo, potencia, raizCuadrada, power, squareRoot, squareroot };
