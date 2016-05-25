var request = require('request');
var Q = require('q');

var user = {
    name: '',
    password: ''
};

var baseURL = '';


function login() {
    var deferred = Q.defer();
    
    request(baseURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            var jsonBody = JSON.parse(body);
            var token = jsonBody.token;
            
            deferred.resovle(token);
        } else {
            deferred.reject(new Error('登录失败'));
        }
    });
    
    return deferred.promise;
}
