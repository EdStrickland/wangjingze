var dataSet = [];
window.onload = function() {

	var img = document.getElementById("source");
	var target = document.getElementById("target");

	var gif = new GIF({
		workers: 2,
		quality: 10,
		workerScript:'../assets/js/gif.worker.js'
	});

	console.log("render start");

	for (i = 52; i >= 1; i --) {
		console.log(i);
		var src = "../assets/img/" + i + ".png";
		console.log(src);
		var img = new Image();
		img.src = src
		gif.addFrame(img);
		gif.render();
	}

	gif.on('finished', function(blob) {
		console.log("render finished");
		target.src = URL.createObjectURL(blob);
	});
}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}


