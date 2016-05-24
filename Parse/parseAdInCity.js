var fs = require('fs');
var advertisements = require('./result/newAdvertisements.json');

// 初始化数据
var adInCity = {
   '001': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '嘉定区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '002': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '金山区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '003': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '奉贤区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '004': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '松江区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '005': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '青浦区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '006': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '闵行区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '007': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '浦东新区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '008': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '长宁区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '009': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '黄浦区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '010': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '宝山区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '011': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '虹口区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '012': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '杨浦区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '013': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '崇明县',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '014': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '徐汇区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '015': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '静安区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   },
   '016': {
       'accommodation': [],
        'commodity': [],
        'education': [],
        'entertainment': [],
        'name': '普陀区',
        'other': [],
        'recruit': [],
        'service': [],
        'social': [],
        'tenancy': []
   }
};


// 读每一条广告，取出广告的播放商圈和分类
var oneAdId;
var districtNum;
for (oneAdId in advertisements) {
    if (typeof advertisements[oneAdId] !== 'function') {
        var oneAd = advertisements[oneAdId];
        var broadcastLocation = oneAd['broadcastLocation'];
        var catalog = oneAd['catalog'];


        // 遍历播放商圈，在每一商圈下的对应分类下添加该广告的ID
        for (districtNum in broadcastLocation) {
            if (typeof broadcastLocation[districtNum] !== 'function') {
                try {
                    var districtId = broadcastLocation[districtNum];
                    var catalogList = adInCity[districtId];
                    var adList = catalogList[catalog];
                    // console.log('adList');
                    // console.log(adList);
                    adList.push(oneAdId);
                    catalogList[catalog] = adList;
                } catch (error) {
                    console.log('error');
                    console.log(error);
                    console.log('catalogList');
                    console.log(catalogList);
                    return;
                }
            }
        }
    }
}


console.log('准备写入文件');
var adInCityJSON = JSON.stringify(adInCity);
fs.writeFile('./result/adInCity.json', adInCityJSON,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log('数据写入成功！');
});
