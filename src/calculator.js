#!/usr/bin/env node
"use strict";

/**
 * Node.js CLI Calculator
 * Supported operations:
 *  - addition (add, +)
 *  - subtraction (subtract, -)
 *  - multiplication (multiply, *)
 *  - division (divide, /)
 *
 * Usage examples:
 *   node src/calculator.js add 4 5
 *   node src/calculator.js --op multiply --a 6 --b 7
 *   node src/calculator.js + 2 3
 *
 * Exits with code 0 on success. Non-zero exit codes for invalid usage.
 */

const args = process.argv.slice(2);
const { add, subtract, multiply, divide } = require('./lib/calculator');

function printUsageAndExit(code = 1) {
  console.error('Usage: node src/calculator.js <op> <a> <b>');
  console.error('   or: node src/calculator.js --op <add|subtract|multiply|divide> --a <num> --b <num>');
  console.error('\nSupported operations: add (+), subtract (-), multiply (*), divide (/)');
  process.exit(code);
}

if (args.length === 0) {
  printUsageAndExit();
}

// Simple flag parser for --op, --a, --b
function parseFlags(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--op' || a === '-o') {
      out.op = argv[i + 1];
      i++;
    } else if (a === '--a') {
      out.a = argv[i + 1];
      i++;
    } else if (a === '--b') {
      out.b = argv[i + 1];
      i++;
    } else if (a.startsWith('--')) {
      // unknown flag
      console.error(`Unknown flag: ${a}`);
      printUsageAndExit();
    } else {
      // positional -- push into list
      out._ = out._ || [];
      out._.push(a);
    }
  }
  return out;
}

const p = parseFlags(args);

let op, aStr, bStr;

if (p.op || (p._ && p._.length >= 1)) {
  if (p.op) {
    op = p.op;
    aStr = p.a;
    bStr = p.b;
  } else {
    // positional: op a b
    op = p._[0];
    aStr = p._[1];
    bStr = p._[2];
  }
} else {
  printUsageAndExit();
}

if (!op || typeof aStr === 'undefined' || typeof bStr === 'undefined') {
  printUsageAndExit();
}

// normalize op names and symbols
function normalizeOp(o) {
  if (!o) return null;
  o = String(o).toLowerCase();
  switch (o) {
    case 'add':
    case '+':
    case 'plus':
      return 'add';
    case 'subtract':
    case '-':
    case 'minus':
      return 'subtract';
    case 'multiply':
    case '*':
    case 'x':
    case 'times':
      return 'multiply';
    case 'divide':
    case '/':
    case '÷':
      return 'divide';
    default:
      return null;
  }
}

const opName = normalizeOp(op);
if (!opName) {
  console.error(`Unsupported operation: ${op}`);
  printUsageAndExit();
}

const a = Number(aStr);
const b = Number(bStr);
if (!Number.isFinite(a) || !Number.isFinite(b)) {
  console.error('Operands must be valid numbers.');
  printUsageAndExit(2);
}

let result;
try {
  switch (opName) {
    case 'add':
      result = add(a, b);
      break;
    case 'subtract':
      result = subtract(a, b);
      break;
    case 'multiply':
      result = multiply(a, b);
      break;
    case 'divide':
      result = divide(a, b);
      break;
    default:
      console.error('Internal error: unknown operation');
      process.exit(4);
  }
} catch (err) {
  // Map library errors to CLI exit codes
  if (err && String(err.message).toLowerCase().includes('division by zero')) {
    console.error('Error: division by zero');
    process.exit(3);
  }
  console.error('Internal error:', err && err.message ? err.message : err);
  process.exit(4);
}

// Print only the result to stdout for scriptability
console.log(result);
process.exit(0);
