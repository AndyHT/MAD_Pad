var severUrl='http://121.42.57.59:4000/user';
//var severUrl='http://127.0.0.1:4000/user';
var userId=localStorage.userId;
var token=localStorage.token;
var ads;
function getAds(){
	
	mui.ajax(severUrl+'/advert/all/'+userId,{
				data:{
					token:token,
				},
				dataType:'json',
				type:'get',
				timeout:10000,
				success:function(data){
					console.log(data.adList);
					console.log(JSON.stringify(data));
					/* 
						get success 
					*/
					if(data.errCode==0){
						ads=data.adList;
						console.log(ads);
						//return ads;
						
					}
				},
				error:function(error){
					console.log(JSON.stringify(error));
					
				} 
		});
	console.log("ss"+ads);
	return ads;
	
}
