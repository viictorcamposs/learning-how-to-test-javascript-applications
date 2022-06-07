import { queryString, parse } from './index';

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

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const query = 'name=Victor&profession=developer';

    expect(parse(query)).toEqual({
      name: 'Victor',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value to object', () => {
    const query = 'name=Victor';

    expect(parse(query)).toEqual({
      name: 'Victor',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const query = 'name=Victor&abilities=JS,TDD';

    expect(parse(query)).toEqual({
      name: 'Victor',
      abilities: ['JS', 'TDD'],
    });
  });
});
