var dataSet = [];
var canvases = [];
var keyFrames = [];
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


	canvas.width = 300;
    canvas.height = 184;


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
	        	temp.width = 300;
    			temp.height = 184;
    			var ctx = temp.getContext("2d");
	        	ctx.drawImage(dataSet[i - 1], 0, 0);
	        	canvases.push(temp);
                keyFrames.push(1);
	        }

        	msg.innerText = "准备完毕";
        }
    }

    gif.on('finished', function(blob) {
        console.log("render finished");
        target.src = URL.createObjectURL(blob);
    });
}

function render (canvas, text, isKeyFrame) {
    if (!isKeyFrame)
        return;
    var ctx = canvases[i].getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "900 40px Courier New";
    ctx.textAlign="center";
    ctx.fillText(text, 150, 150);
    ctx.strokeText(text, 150, 150);
}

function start (reverse) {
	console.log(status);
	if (status == 52) {
		if (reverse) {
			for (i = 51; i > -1; i--) {
                var text = document.getElementById("text").value;
                render(canvases[i], text keyFrames[i]);
                msg.innerText = "正在渲染第 " + status + "/52 帧";
                gif.addFrame(canvases[i], { delay: 95 });
	        }
	        gif.render();
	        return;
		}

        for (i = 0; i < 52; i++) {
			var ctx = canvases[i].getContext("2d");
        	ctx.fillStyle = "white";
        	ctx.font = "900 40px Courier New";
			ctx.textAlign="center";
        	var text = document.getElementById("text").value;
        	ctx.fillText(text, 150, 150);
        	ctx.strokeText(text, 150, 150);
        	msg.innerText = "正在渲染第 " + status + "/52 帧";
            gif.addFrame(canvases[i], { delay: 95 });
        }
        gif.render();
    }
}