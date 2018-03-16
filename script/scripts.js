var dataSet = [];
var status = 0;
window.onload = function() {

    var img = document.getElementById("source");
    var target = document.getElementById("target");
    var msg = document.getElementById("msg");

    var gif = new GIF({
        workers: 8,
        quality: 10,
        workerScript: '../assets/js/gif.worker.js'
    });

    console.log("render start");

    // gif.addFrame(img);

    // gif.render();
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
        status++;
        msg.innerhtml = "已下载素材：" + status; + "/52";
        
    }


    gif.on('finished', function(blob) {
        console.log("render finished");
        target.src = URL.createObjectURL(blob);
    });
}

function start() {

	if (status == 52) {
        for (i = 0; i < 52; i++) {
        	msg.innerhtml = "正在渲染第 " + status; + "/52 帧";
            gif.addFrame(dataSet[i], { delay: 75 });
        }
        gif.render();
    }
}

function convertImageToCanvas(image) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);

    return canvas;
}