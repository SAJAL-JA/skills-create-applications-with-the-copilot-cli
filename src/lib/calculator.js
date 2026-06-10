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

function raizCuadrada(n) {
  if (n < 0) {
    throw new Error('cannot take square root of negative number');
  }
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, potencia, raizCuadrada };
