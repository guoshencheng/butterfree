var axios = require('axios');
var config = require('config');

var adminRequest = axios.create({
  baseURL: config.apiServer,
  headers: {
    "admin-token": config.accessToken
  }
});

var commonRequest = axios.create({
  baseURL: config.apiServer,
  headers: {
    "access-token": config.accessToken
  }
});

module.exports = {
  adminRequest, commonRequest
};
