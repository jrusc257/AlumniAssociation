var locationDetailArray = [
	['Error','No Image','Sorry, Unable to find location.  Make sure your GPS is enabled.  Are you even on campus?'],
	['DUC and Administration','<img src="images/DUC_Administration.jpg" />','This area of the campus holds many of the administrative buildings.  Buildings include the Student Services building, the Dreyfus University Center, and others.'],
	['Academic Buildings','<img src="images/Academic_Buildings.jpg" />','Here are all the academic buildings, in addition to 601 Devision Street (you are probably in the science building if you see this)'],
	['South Quad','<img src="images/South_Quad.jpg" />','This is the sourh quad of buildings, and also Debot dining center'],
	['North Quad','<img src="images/North_Quad.jpg" />','This is the north quad, and the maintainence buildings.'],
	['East Quad','<img src="images/East_Quad.jpg" />','East quad of dorms that include Pray Sims, Smith, May Roach, and the Suites @201.  Also the Allen Center'],
	['My House','<img src="images/2024Jefferson.jpg" />','This is my house, dont tell anyone<br /><br /><div id="videoLink" onClick="goVideo()">Click on this link to see a cool video</div>']]
	;
	
//index 0 is identifier
//index 1 is top lattitude
//index 2 is bottom lattitude
//index 3 is left longitude
//index 4 is right longitude
var locationCoordArray = new Array;

locationCoordArray[0] = [['DUC and Administration'],[44.526722 ],[44.522121],[-89.569712],[-89.565852]]
locationCoordArray[1] = [['Academic Buildings'],[44.530214],[44.526244],[-89.574757],[-89.569661]]
locationCoordArray[2] = [['South Quad'],[44.532669],[44.530030],[-89.573792],[-89.569822]]
locationCoordArray[3] = [['North Quad'],[44.535139],[44.532447],[-89.57369],[-89.569736]]
locationCoordArray[4] = [['East Quad'],[44.533778],[44.528814],[-89.569715],[-89.567344]]
locationCoordArray[5] = [['My House'],[44.519907],[44.519214],[-89.570935],[-89.570082]]

function goVideo(){
	window.open('http://www.youtube.com/watch?v=oQpwu_wKcZo', '_blank', 'location=yes');
}

function geoRefresh(){
	document.getElementById('header').innerHTML = '&nbsp;';
	document.getElementById('image').innerHTML = '&nbsp;';
	document.getElementById('content').innerHTML = 'Finding Geolocation...';
	navigator.geolocation.getCurrentPosition(
			onSuccess,
			onError);
			
			/*,{
			timeout: 60000,
			enableHighAccuracy:true}*/
}

function onSuccess(position) {
	var found = false;  // Sets a flag to check whether you're within ANY of the geographic parameters
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	/*var acc = position.coords.accuracy;*/
	
	for(var i=0; i<locationCoordArray.length; i++){
		if(lat < locationCoordArray[i][1] && lat > locationCoordArray[i][2] && long > locationCoordArray[i][3] && long < locationCoordArray[i][4]){
			displayDetails(i);
			found = true			
		}
	}
	if(!found){
		displayDetails(0);
		/*alert("top: " + locationCoordArray[1][1] + "\nYou: " + lat +"\nbottom: " + locationCoordArray[1][2]);
		alert("left: " + locationCoordArray[1][3] + "\nYou: " + long +"\nright: " + locationCoordArray[1][4]);*/
	}
}

// onError Callback receives a PositionError object
//
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n'+
		  'You may need to restart your device to allow geolocation');
}


function displayDetails(currentLocation){
	var header = document.getElementById('header');
	var image = document.getElementById('image');
	var content = document.getElementById('content');
	// Sets up shorthand variables for content sections
	header.innerHTML = locationDetailArray[currentLocation+1][0];
	image.innerHTML = locationDetailArray[currentLocation+1][1];
	content.innerHTML = locationDetailArray[currentLocation+1][2];
}