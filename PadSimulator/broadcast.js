'use strict';

var Q = require('q');
var request = require('request');

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
  var jsonBody;

  // 拼接URL
  var url = Config.testBaseURL + '/user/advert/content';

  request.post(url, {
    form: {
      'token': info.token,
      'coordinate': info.coordinate
    }
  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      try {
        jsonBody = JSON.parse(body);
        if (jsonBody.errCode === 0) {
          // console.log(jsonBody);
          // 返回ID列表
          deferred.resolve(jsonBody.idArray);
        } else {
          deferred.reject(new Error('获取广告ids出错:' + jsonBody.errCode));
        }
      } catch (err) {
        deferred.reject(err);
      }
    } else {
      deferred.reject(error);
    }
  });

  return deferred.promise;
}

// 遍历ID数组播放广告，每次播放时sleep3秒
// function broadcastAdvert(id, token) {
//   var deferred = Q.defer();
//   var jsonBody;
//
//   // 拼接URL
//   var url = '';
//
//   request(url, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       try {
//         jsonBody = JSON.parse(body);
//         if (jsonBody.errCode === 0) {
//           console.log(jsonBody);
//
//           deferred.resolve(true);
//         } else {
//           deferred.reject(new Error('播放广告时出错:' + response.errCode));
//         }
//       } catch (err) {
//         deferred.reject(err);
//       }
//     } else {
//       deferred.reject(error);
//     }
//   });
//
//   return deferred.promise;
// }
