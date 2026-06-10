const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../lib/calculator');

describe('Calculator library', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws error', () => {
    expect(() => divide(1, 0)).toThrow(/division by zero/i);
  });

  test('works with negative numbers and floats', () => {
    expect(add(-1, 1)).toBe(0);
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3, 5);
    expect(multiply(-3, 3)).toBe(-9);
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test('modulo: 10 % 3 = 1', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('power: 2^8 = 256', () => {
    expect(power(2, 8)).toBe(256);
  });

  test('square root: 9 -> 3 and negative throws', () => {
    expect(squareRoot(9)).toBe(3);
    expect(() => squareRoot(-1)).toThrow(/negative/i);
  });
});
