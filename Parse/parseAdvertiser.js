var Papa = require('babyparse');
var fs = require('fs');

var advertisers = require('./rawData/advertiser.json');

var config = {
  delimiter: ','
};

var data = fs.readFileSync('rawData/advertiser.csv');

var result = Papa.parse(data.toString(), config);
// console.log(result.data);

var advertiserArray = [];
var advertiserInfo;
var advertiserId;
var newAdvertiser = {};

result.data.forEach(function (record) {
  // console.log('one record:');
  // console.log(record);
  // 判断数据是否正常
  if (record.length > 1) {
    advertiserId = record[0].replace(/[.]/g, '-');
    advertiserInfo = {
      'Alipay': record[18],
      'balance': 10000,
      'check': true,
      'currentBroadcast': 500,
      'detail': {
        'accomodation': '曹安公路4800号',
        'businessPeriod': '2020-01-01 00:00:00',
        'companyName': '随意',
        'contactEmail': record[0],
        'legalPerson': {
          'id': '123456789097891273912783',
          'iflegalperson': true,
          'iflongterm': true,
          'location': '中国大陆',
          'name': '不知道',
          'validDate': '长期'
        },
        'licenseCode': '111111111111111111111',
        'licenseImageUrl': 'http://img.jdzj.com/UserDocument/2013b/wuxibangyao/Picture/201372694821.jpg',
        'licenseType': '普通营业执照',
        'location': '上海，嘉定区',
        'organizationCode': '00000101010101010',
        'periodIsLong': true,
        'type': '企业'
      },
      'email': record[0],
      'name': record[2],
      'password': 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
      'registerDate': '2016-05-15 10:00:00',
      'status': '100',
      'token': 'testtoken'
    };

    newAdvertiser[advertiserId] = advertiserInfo;
    advertiserArray.push(newAdvertiser);
    newAdvertiser = {};
  }
});

// console.log(advertiserArray);
advertiserArray.forEach(function (one) {
  // console.log(one);

  for (advertiserId in one) {
    if (typeof one[advertiserId] !== 'function') {
      advertisers[advertiserId] = one[advertiserId];
    }
  }
});

var advertiserJSON = JSON.stringify(advertisers);

fs.writeFile('./result/newAdvertiser.json', advertiserJSON,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log('数据写入成功！');
});
