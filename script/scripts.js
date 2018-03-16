window.onload = function() {
	var img = document.getElementById('source');
	var can = document.getElementById('target');
	var cxt = can.getContext('2d');
	setInterval(function (){
		cxt.drawImage(img, 0, 0);
	}, 500);
}