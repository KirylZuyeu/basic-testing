// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = {
      a: 1,
      b: 1,
      action: Action.Add,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(2);
  });

  test('should subtract two numbers', () => {
    const input = {
      a: 1,
      b: 1,
      action: Action.Subtract,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const input = {
      a: 1,
      b: 1,
      action: Action.Multiply,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(1);
  });

  test('should divide two numbers', () => {
    const input = {
      a: 1,
      b: 1,
      action: Action.Divide,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const input = {
      a: 1,
      b: 1,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(input);

    expect(result).toBe(1);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 1,
      b: 1,
      action: '111',
    };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 1,
      b: '111',
      action: Action.Add,
    };

    const result = simpleCalculator(input);

    expect(result).toBeNull();
  });
});
