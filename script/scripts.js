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


    canvas.width = img.width;
    canvas.height = img.height;

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
        	var temp = document.createElement("canvas");
        	temp.getContext("2d").drawImage(this, 0, 0);
        canvases.push(temp);
            callback();
        }
        dataSet.push(img);
    }

    function callback() {
        canvas.getContext("2d").drawImage(dataSet[status], 0, 0);
        status++;
        msg.innerText = "已下载素材：" + status + "/52";
    }

    gif.on('finished', function(blob) {
        console.log("render finished");
        target.src = URL.createObjectURL(blob);
    });
}

function start() {
	console.log(status);
	if (status == 52) {
        for (i = 0; i < 52; i++) {
        	msg.innerText = "正在渲染第 " + status + "/52 帧";
            gif.addFrame(canvases[i], { delay: 75 });
        }
        gif.render();
    }
}