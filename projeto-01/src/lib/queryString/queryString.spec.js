const { queryString } = require('./index');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Victor',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Victor&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Victor',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Victor&abilities=JS,TDD');
  });

  it('should thrown an error when an object is passed as value', () => {
    const obj = {
      name: 'Victor',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});
