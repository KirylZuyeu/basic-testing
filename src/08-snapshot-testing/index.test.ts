import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const list = generateLinkedList(values);

    const expectedStructure = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(list).toStrictEqual(expectedStructure);

    expect(generateLinkedList([])).toStrictEqual({ value: null, next: null });
  });

  test('should generate linked list from values 2', () => {
    const stringList = generateLinkedList(['1', '2', '3', '4']);
    expect(stringList).toMatchSnapshot();
  });
});
