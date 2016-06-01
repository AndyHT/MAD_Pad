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


// 生成经纬度坐标
function generatorCoordinate(region) {
  var latGap = region.endLat - region.startLat;
  var lonGap = region.endLong - region.startLong;

  return {
    latitude: region.startLat + Math.random().toFixed(2) * latGap,
    longitude: region.startLong + Math.random().toFixed(2) * lonGap
  };
}

Generator.judgeCoordinate = function(token) {
  var deferred = Q.defer();
  var jsonData;
  var coordinate = { // 31.227458, 121.473153
    latitude: 31.227458,
    longitude: 121.473153
  }
  var url;
  var response;
  var i = 0;

  try {
    // while (true && i < 5) {
    //   coordinate = generatorCoordinate(rectangle);
    //   // console.log(coordinate);
    //   url = 'http://restapi.amap.com/v3/geocode/regeo?location=' + coordinate.latitude + ',' + coordinate.longitude + '&key=d283b9b9e40cb549d56b80a1e4551054';
    //
    //   response = JSON.parse(request('GET', url).body);
    //   // console.log(response);
    //   if ('上海市' === response.regeocode.addressComponent.province) {
    //     // 获取到一个位置
    //     deferred.resolve({
    //       token: token,
    //       coordinate: coordinate
    //     });
    //     break;
    //   }
    //   i += 1;
    // }

    deferred.resolve({
      'token': token,
      'coordinate': coordinate
    });
  } catch (error) {
    console.log(error);

    // 获取数据错误，需要判断错误类型
    deferred.reject(error);
  }
  return deferred.promise;
};
