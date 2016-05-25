var severUrl='http://121.42.57.59:4000/user';
//var severUrl='http://127.0.0.1:4000/user';
var userId=localStorage.userId;
var token=localStorage.token;
console.log(token);
var ads;
var longitude;
var latitude;
document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady(){
	plus.geolocation.getCurrentPosition( function ( p ) {
		//alert( "Geolocation\nLatitude:" + p.coords.latitude + "\nLongitude:" + p.coords.longitude + "\nAltitude:" + p.coords.altitude );
	latitude=p.coords.latitude;
	longitude=p.coords.longitude;
	console.log(p.coords.latitude);
	console.log(p.coords.longitude);
	}, function ( e ) {
		//alert( "Geolocation error: " + e.message );
	} ); 
	plus.screen.lockOrientation("landscape");
	plus.device.setWakelock(true);
	return {
		latitude:latitude,
		longitude:longitude
	}
}

