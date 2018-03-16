var dataSet = [];
window.onload = function() {

	var img = document.getElementById("source");

	var gif = new GIF({
		workers: 2,
		quality: 10
	});

	gif.addFrame(img);

	gif.on('finished', function(blob) {
		window.open(URL.createObjectURL(blob));
	});



	gif.render();
}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}


