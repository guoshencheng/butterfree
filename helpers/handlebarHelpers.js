const pages = require('../constants/pages');
const pathToRegexp = require('path-to-regexp');

const isActive = (current, path) => {
  return pathToRegexp(path).test(current) ? 'active' : ''
}

module.exports = {
  isActive
};
