const { queryString } = require('./index');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Victor',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Victor&profession=developer');
  });
});
