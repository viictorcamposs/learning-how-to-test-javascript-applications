const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }

  return `${key}=${value}`;
};

module.exports = {
  queryString: obj => Object.entries(obj).map(keyValueToString).join('&'),
  parse: string =>
    Object.fromEntries(
      string.split('&').map(position => {
        let [key, value] = position.split('=');

        if (value.includes(',')) {
          value = value.split(',');
        }

        return [key, value];
      }),
    ),
};
