'use strict';

var request = require('sync-request');
var Q = require('q');

var Config = require('./config.json');

module.exports = Generator;

function Generator(obj) {
  var key;
  for (key in obj) {
    this[key] = obj[key];
  }
}

// 矩形范围内随机生成经纬度
var rectangle = {
  startLat: 30.38,
  endLat: 31.45,
  startLong: 120.86,
  endLong: 121.75
}

var latGap = rectangle.endLat - rectangle.startLat;
var lonGap = rectangle.endLong - rectangle.startLong;

// 生成经纬度坐标
function generatorCoordinate() {
  return {
    latitude: rectangle.startLat + Math.random().toFixed(2) * latGap,
    longitude: rectangle.startLong + Math.random().toFixed(2) * lonGap
  };
}

Generator.judgeCoordinate = function(token) {
  var deferred = Q.defer();
  var jsonData;
  var coordinate;
  var url;
  var response;

  try {
    // while(true) {
      coordinate = generatorCoordinate();
      console.log(coordinate);
      url = 'http://restapi.amap.com/v3/geocode/regeo?location=' + coordinate.latitude + ',' + coordinate.longitude + '&key=d283b9b9e40cb549d56b80a1e4551054';

      response = JSON.parse(request('GET', url).body);
      console.log(response);
      if ('上海市' === response.regeocode.addressComponent.province) {
        deferred.resolve({
          token: token,
          coordinate: coordinate
        });
        // break;
      }
      // break;
    // }
  } catch (error) {
    console.log(error);
    deferred.reject(new Error('判断是否在上海时失败'));
  }

  // 高德地图判断是否在上海
  // request(url, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //     // console.log(body);
  //     try {
  //       jsonData = JSON.parse(body);
  //       // console.log(jsonData.regeocode.addressComponent.province);
  //
  //       // 在上海的话返回经纬度，不在上海就再生成一条
  //
  //
  //
  //       if ('上海市' === jsonData.regeocode.addressComponent.province) {
  //         deferred.resolve({
  //           token: token,
  //           coordinate: coordinate
  //         });
  //       } else {
  //         deferred.reject(new Error('不在上海'));
  //       }
  //     } catch (err) {
  //       deferred.reject(err);
  //     }
  //   } else {
  //     deferred.reject(new Error('没有获取到数据' + error.message));
  //   }
  // });
  //
  return deferred.promise;
};
