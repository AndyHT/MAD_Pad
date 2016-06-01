'use strict';

var Q = require('q');
var request = require('request');
var syncRequest = require('sync-request');
var sleep = require('sleep');

var Config = require('./config.json');

module.exports = Broadcast;

function Broadcast(obj) {
  var key;
  for (key in obj) {
    this[key] = obj[key];
  }
}

// 根据经纬度请求广告ID数组
Broadcast.getAdvertIds = function (info) {
  var deferred = Q.defer();
  // 拼接URL
  var url = Config.testBaseURL + '/user/advert/ids';

  request.post({'url': url,'json': info}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      try {
        if (body.errCode === 0) {
          // 返回ID列表
          deferred.resolve({
            'idArray': body.idArray,
            'token': info.token
          });
        } else {
          deferred.reject(new Error('获取广告ids出错:' + body.errCode));
        }
      } catch (err) {
        deferred.reject(err);
      }
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
};

// 遍历ID数组播放广告，每次播放时sleep3秒
Broadcast.broadcastAdverts = function (info) {
  var deferred = Q.defer();
  var jsonBody;

  // 拼接URL
  var url = Config.testBaseURL + '/user/advert/content';

  info.idArray.forEach(function (id) {
    var response = syncRequest('POST', url, {
      json: {
        'token': info.token,
        'id': id
      }});
    // console.log('response::::::');
    // console.log(response.body);
    jsonBody = JSON.parse(response.body);
    if (jsonBody.errCode === 0) {
      console.log('获取到ID，播放：');
      console.log(jsonBody.content);
    } else {
      console.log('errCode:' + jsonBody.errCode);
    }
    sleep.sleep(3);
  });
  deferred.resolve(true);

  return deferred.promise;
}
