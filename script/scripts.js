var dataSet = [];
var canvases = [];
var status = 0;
var img;
var target;
var msg;
var canvas;
var gif;

window.onload = function() {
    img = document.getElementById("source");
    target = document.getElementById("target");
    msg = document.getElementById("msg");
    canvas = document.getElementById("can");

    img.onload = function() {
    	canvas.width = img.width;
	    canvas.height = img.height;
    }

    gif = new GIF({
        workers: 8,
        quality: 10,
        workerScript: '../assets/js/gif.worker.js'

    });

    for (i = 52; i >= 1; i--) {
        var src = "../assets/img/" + i + ".png";
        var img = new Image();
        img.src = src;
        img.onload = function() {
            callback();
        }
        dataSet.push(img);
    }

    function callback() {
        canvas.getContext("2d").drawImage(dataSet[status], 0, 0);
        status++;
        msg.innerText = "已下载素材：" + status + "/52";
        if (status == 52) {
        	for (i = 1; i <= 52; i++) {
        		msg.innerText = "正在加载素材：" + i + "/52";
	        	var temp = document.createElement("canvas");
	        	temp.width = img.width;
    			temp.height = img.height;
    			var ctx = temp.getContext("2d");
	        	ctx.drawImage(dataSet[i], 0, 0);
	        	ctx.fillStyle = "white";
	        	ctx.font = "30px Courier New";
	        	ctx.fillText("字符测试", 50, 50);
	        	ctx.strokeText("字符测试", 50, 50);
	        	canvases.push(temp);
	        }

        	msg.innerText = "准备完毕";
        }
    }

    gif.on('finished', function(blob) {
        console.log("render finished");
        target.src = URL.createObjectURL(blob);
        gif = new GIF({
	        workers: 8,
	        quality: 10,
	        workerScript: '../assets/js/gif.worker.js'

	    });
    });
}

function start(reverse) {
	console.log(status);
	if (status == 52) {
		if (reverse) {
			for (i = 51; i > -1; i--) {
	        	msg.innerText = "正在渲染第 " + status + "/52 帧";
	            gif.addFrame(canvases[i], { delay: 85 });
	        }
	        gif.render();
	        return;
		}

        for (i = 0; i < 52; i++) {
        	msg.innerText = "正在渲染第 " + status + "/52 帧";
            gif.addFrame(canvases[i], { delay: 85 });
        }
        gif.render();
    }
}