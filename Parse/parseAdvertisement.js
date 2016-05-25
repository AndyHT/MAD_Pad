var Papa = require('babyparse');
var fs = require('fs');

var advertisements = require('./rawData/advertisements.json');

var config = {
  delimiter: ','
};

var data = fs.readFileSync('rawData/advertisement.csv');

var result = Papa.parse(data.toString(), config);

var advertArray = [];
var advertInfo;
var advertId;
var newAdvert = {};

console.log(result.data.length);
result.data.forEach(function (record) {
  // console.log(record);
  if (record.length === 13) {
    advertId = record[0];
    advertInfo = {
      'advertiser': record[1].replace(/[.]/g, '-'),
      'broadcastLocation': ['001','002','003','004','005','006','007','008','009','010','011','012','013','014','015','016'],
      'broadcastTimes': 0,
      'catalog': record[4],
      'city': 'Shanghai',
      'content': record[5],
      'createTime': record[10],
      'endDate': '2016-05-20 00:00:00',
      'price': 3.00,
      'startDate': '2017-05-20 00:00:00',
      'status': '001',
      'title': record[9]
    }
    newAdvert[advertId] = advertInfo;
    advertArray.push(newAdvert);
    newAdvert = {};
  }
});

// console.log(advertArray);

advertArray.forEach(function (one) {
  for (advertId in one) {
    if (typeof one[advertId] !== 'function') {
      advertisements[advertId] = one[advertId];
    }
  }
});

var advertJSON = JSON.stringify(advertisements);

fs.writeFile('./result/newAdvertisements.json', advertJSON,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log('数据写入成功！');
});
