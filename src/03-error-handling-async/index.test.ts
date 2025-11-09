// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const expectedValue = 42;
    const result = await resolveValue(expectedValue);
    expect(result).toBe(expectedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Some Error Message';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow();
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow('This is my awesome custom error!');
  });
});
