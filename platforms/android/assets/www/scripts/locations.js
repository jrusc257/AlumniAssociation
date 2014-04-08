	
function ajaxGet(file){
	var xmlHttpObj = new XMLHttpRequest();
	xmlHttpObj.onreadystatechange=function(){
	  if (xmlHttpObj.readyState==4 && xmlHttpObj.status==200)
		{
			document.getElementById("locInfo").innerHTML=xmlHttpObj.responseText;
		}
	}
	xmlHttpObj.open("GET", "includes/" + file, true);
	xmlHttpObj.send();
}

//index 0 is identifier
//index 1 is top lattitude
//index 2 is bottom lattitude
//index 3 is left longitude
//index 4 is right longitude
var locationCoordArray = new Array;

locationCoordArray[0] = [['quadAdministration.html'],[44.526722 ],[44.522121],[-89.569712],[-89.565852]]
locationCoordArray[1] = [['quadAcademics.html'],[44.530214],[44.526244],[-89.574757],[-89.569661]]
locationCoordArray[2] = [['quadSouth.html'],[44.532669],[44.530030],[-89.573792],[-89.569822]]
locationCoordArray[3] = [['quadNorth.html'],[44.535139],[44.532447],[-89.57369],[-89.569736]]
locationCoordArray[4] = [['quadEast.html'],[44.533778],[44.528814],[-89.569715],[-89.567344]]
locationCoordArray[5] = [['includes/quads/MyHouse.html'],[44.519907],[44.519214],[-89.570935],[-89.570082]]

function goVideo(){
	window.open('http://www.youtube.com/watch?v=oQpwu_wKcZo', '_blank', 'location=yes');
}

function geoRefresh(){
	document.getElementById('locInfo').innerHTML = 'Finding Geolocation...';
	navigator.geolocation.getCurrentPosition(
		onSuccess,
		onError),
		{
			timeout: 60000,
			enableHighAccuracy:true
		};
}

function onSuccess(position) {
	var found = false;  // Sets a flag to check whether you're within ANY of the geographic parameters
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	/*var acc = position.coords.accuracy;*/
	
	for(var i=0; i<locationCoordArray.length; i++){
		if(lat < locationCoordArray[i][1] && lat > locationCoordArray[i][2] && long > locationCoordArray[i][3] && long < locationCoordArray[i][4]){
			window.location = locationCoordArray[i][0];
			found = true			
		}
	}
	if(!found){
		document.getElementById("locInfo").innerHTML="Sorry, you are not close enough to campus to get details";
	}
}

// onError Callback receives a PositionError object
//
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n'+
		  'You may need to restart your device to allow geolocation');
}
