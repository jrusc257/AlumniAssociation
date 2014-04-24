//index 0 is identifier
//index 1 is top latitude
//index 2 is bottom latitude
//index 3 is left longitude
//index 4 is right longitude
var deviceRatio;
var locationCoordArray = new Array;

locationCoordArray[0] = [['quadAdministration.html'],[44.526722 ],[44.522121],[-89.569712],[-89.565852]]
locationCoordArray[1] = [['quadAcademics.html'],[44.530214],[44.526244],[-89.574757],[-89.569661]]
locationCoordArray[2] = [['quadSouth.html'],[44.532669],[44.530030],[-89.573792],[-89.569822]]
locationCoordArray[3] = [['quadNorth.html'],[44.535139],[44.532447],[-89.57369],[-89.569736]]
locationCoordArray[4] = [['quadEast.html'],[44.533778],[44.528814],[-89.569715],[-89.567344]]
locationCoordArray[5] = [['MyHouse.html'],[44.519907],[44.519214],[-89.570935],[-89.570082]]

function geoRefresh(){
	document.getElementById('locInfo').innerHTML = '<div id="loading"><img src="images/GPS.gif" /></div>';
	navigator.geolocation.getCurrentPosition(
		onSuccess,
		onError,
		{
			timeout: 60000,
			enableHighAccuracy:true
		});
}
function onSuccess(position) {
	var found = false;  // Sets a flag to check whether you're within ANY of the geographic parameters
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	/*var acc = position.coords.accuracy;*/
	
	for(var i=0; i<locationCoordArray.length; i++){
		if(lat < locationCoordArray[i][1] &&
		   lat > locationCoordArray[i][2] &&
		   long > locationCoordArray[i][3] &&
		   long < locationCoordArray[i][4])
		   {
				window.location = locationCoordArray[i][0];
				found = true			
		   }
	}
	if(!found){
		document.getElementById("locInfo").innerHTML =
			"Sorry, you are not close enough to campus to get details";
	}
}
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n'+
		  'You may need to restart your device to allow geolocation');
}
function ajaxGet(file){
	var xmlHttpObj = new XMLHttpRequest();
	xmlHttpObj.onreadystatechange=function(){
	  if (xmlHttpObj.readyState==4 && xmlHttpObj.status==200)
		{
			document.getElementById("locInfo").innerHTML = 
			xmlHttpObj.responseText + '\n<div id="navigation"><a href="" class="button" onclick="window.location.reload(true);">back</a></div>';
		}
	}
	xmlHttpObj.open("GET", "includes/" + file, true);
	xmlHttpObj.send();
	alert("Width: " + $(window).width() + "\nHeight: " + $(window).height());
}
function goVideo(url){
	window.open(url, '_blank', 'location=yes');
}
function orientationChange(){
	if($("#locInfo").hasClass("landscape")){
		alert("width: " + screen.width + "\nheight: " + screen.height);
		$("#locInfo").removeClass("landscape");
		$("#locInfo").addClass("portrait");
	}else{		
		alert("width: " + screen.width + "\nheight: " + screen.height);
		$("#locInfo").removeClass("portrait");
		$("#locInfo").addClass("landscape");
	}
}
function initOrientation(){
	alert("init\nwidth: " + screen.width + "\nheight: " + screen.height);
	if(screen.height < screen.width){
		$("#locInfo").addClass("landscape");
	}else{
		$("#locInfo").addClass("portrait");
	}
}
