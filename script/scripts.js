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
                keyFrames.push(0);
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
    ctx.font = "900 25px Courier New";
    ctx.textAlign="center";
    ctx.fillText(text, 150, 165);
    ctx.strokeText(text, 150, 165);
}

function setKeyFrame(keyFrame) {
    for (i = keyFrame; i < keyFrame + 10; i ++) {
        keyFrames[i] = 1;
    }
}

function start (reverse) {
	console.log(status);

    var t1 = parseInt(document.getElementById("t1").value);
    var t2 = parseInt(document.getElementById("t2").value);
    var t3 = parseInt(document.getElementById("t3").value);
    var t4 = parseInt(document.getElementById("t4").value);

    setKeyFrame(t1);
    setKeyFrame(t2);
    setKeyFrame(t3);
    setKeyFrame(t4);

	if (status == 52) {
		if (reverse) {
            keyFrames.reverse();
			for (i = 51; i > -1; i--) {
                var text = document.getElementById("text").value;
                render(canvases[i], text, keyFrames[i]);
                msg.innerText = "正在渲染第 " + status + "/52 帧";
                gif.addFrame(canvases[i], { delay: 95 });
	        }
	        gif.render();
	        return;
		}

        for (i = 0; i < 52; i++) {
            var text = document.getElementById("text").value;
            render(canvases[i], text, keyFrames[i]);
        	msg.innerText = "正在渲染第 " + status + "/52 帧";
            gif.addFrame(canvases[i], { delay: 95 });
        }
        msg.innerText = "渲染成功";
        gif.render();
    }
}