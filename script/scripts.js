window.onload = function() {
	var img = document.getElementById('source');
	var target = document.getElementById('target');
	var dataSet = [];
	setInterval(function (){
		var temp = convertImageToCanvas(img).toDataURL("image/png");
		if (!dataSet.findIndex(temp)) {
			dataSet.push(temp);
		}
	}, 20);
}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}


// var gif = new GIF({
// 	workers: 2,
// 	quality: 10
// });
// // 添加一个图片标签对象像素到当前帧
// gif.addFrame(imageElement);
// //或添加一个canvas对象的像素到当前帧
// gif.addFrame(document.getElementsByTagName('canvas')[0], {
// 	delay: 200
// });
// gif.addFrame(document.getElementsByTagName('canvas')[0], {
// 	delay: 200
// });
// gif.addFrame(document.getElementsByTagName('canvas')[0], {
// 	delay: 200
// });
// //从canvas context复制像素到当前帧
// gif.addFrame(ctx, {
// 	copy: true
// });
// //合成图片成功后
// gif.on('finished', function(blob) {
// 	window.open(URL.createObjectURL(blob));
// });
// //渲染图片
// gif.render();