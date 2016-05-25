'use strict';
var Q = require('q');

var Login = require('./login.js');
var Generator = require('./generator.js');
var Broadcast = require('./broadcast.js');

var Config = require('./config.json');

// 使用测试账号登陆MAD平台
// Login.login(Config.user.name, Config.user.password)
//   .then(Generator.judgeCoordinate)
//   .then(Broadcast.getAdvertIds)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

Generator.judgeCoordinate(Config.token)
  // .then(Broadcast.getAdvertIds)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 随机生成经纬度(上海范围内)

// 发送经纬度信息到服务器获取广告ID列表

// 根据广告ID获取广告内容

// 播放广告
