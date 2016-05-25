'use strict';

var request = require('request');
var Q = require('q');

var Config = require('./config.json');

module.exports = Login;

function Login(obj) {
  var key;
  for (key in obj) {
    this[key] = obj[key];
  }
}

Login.login = function(name, pass) {
    var deferred = Q.defer();
    var loginURL = Config.testBaseURL + '/user/login'

    request.post(loginURL, {
      form:{
        username: name,
        password: pass
      }
    },function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            var jsonBody = JSON.parse(body);
            var token = jsonBody.token;

            deferred.resolve(token);
        } else {
            deferred.reject(new Error('登录失败:' + error.message));
        }
    });

    return deferred.promise;
}
