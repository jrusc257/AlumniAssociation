// JavaScript Document

var optionTexts = [];

function checkin(location){
	window.localStorage.setItem(location, "Yes")
	alert("Checked in at " + location);
}
function showCheckins(){
	$("ul li").each(function() { optionTexts.push($(this).attr('class')) });
	for(var i=0; i<optionTexts.length; i++){
		var visited = window.localStorage.getItem(optionTexts[i]);
		if(visited != "Yes")visited = "No";
		$("." + optionTexts[i]).append("<span class='checkin" + visited + "'>" + visited + "</span>");
	}
}
function clearAll(){
	var r=confirm("Are you sure you want to start the tour over?");
	if (r==true){
		$("ul li").each(function() { optionTexts.push($(this).attr('class')) });
		for(var i=0; i<optionTexts.length; i++){
			window.localStorage.removeItem(optionTexts[i]);
		}
		window.location.reload(true);
	}
		
}
