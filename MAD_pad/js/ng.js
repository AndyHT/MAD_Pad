var mad=angular.module('mad',[]);

 

mad.controller('pad',['$scope','$http','$interval',function($scope,$http,$interval){
	var callNext;
	var times=0;
	var call=true;
	$scope.content='广告区域';   
	$scope.btnText='开始播放';
	$scope.stop='停止播放';
	//开始就拿到ID数组，如果是在下一条时没有广告可播放，则执行此函数，并在请求成功后继续相应操作
	$scope.getIds=function(callback){
		times++;
		$scope.notice='获取播放广告列表第'+times+'次尝试';
		$http.post(severUrl+'/advert/ids',{
			token:token,
			coordinate:{
				latitude:onPlusReady().latitude,
				longitude:onPlusReady().longitude
			}
		}).success(function(data){
			
			console.log(JSON.stringify(data)); 
			$scope.idArray=data.idArray;
			if(call){
				callback();
			}
			console.log(latitude);
			console.log(longitude);
		}).error(function(error){
			console.log(error);
		});
	};
	//根据广告ID获得广告内容
	$scope.getContent=function(adId){
		$http.post(severUrl+'/advert/content',{
			token:token,
			id:adId
		}).success(function(data){
			console.log(JSON.stringify(data));
			$scope.content=data.content||data.errMessage;
		}).error(function(error){
			console.log(error);
//			$scope.content=error.errMessage;
		})
	}
	//播放下一条
	$scope.next=function(){
		if(call){
			//call=true;
			$scope.btnText='点击播放下一条';
			clearTimeout(callNext);
			var idList=$scope.idArray||[];
			console.log($scope.idArray);
			var len=idList.length;
			if(len==0){
				$scope.content='广告区域';
				setTimeout(function(){
					$scope.getIds(function(){
					$scope.next();
					});
				},1000);
				 
			} else{
				times=0;
				$scope.notice='当前剩余'+len+'条可播放广告';
				var id=idList[0];
				idList.shift();
				$scope.idArray=idList;
				$scope.getContent(id);
				callNext=setTimeout(function(){
					$scope.next();
					
				},5000);  
			}
		}else{
			call=true;
		}
		
		
	};
	//停止播放
	$scope.cancelCall=function(){
		call=false;
		$scope.btnText='开始播放';
		
		//document.getElementById('stopId').display='none';
	}
}])
