var dataSet = [];
var status = 0;
window.onload = function() {

    var img = document.getElementById("source");
    var target = document.getElementById("target");

    var gif = new GIF({
        workers: 4,
        quality: 10,
        workerScript: '../assets/js/gif.worker.js'
    });

    console.log("render start");

    // gif.addFrame(img);

    // gif.render();
    for (i = 52; i >= 1; i--) {
        console.log(i);
        var src = "../assets/img/" + i + ".png";
        console.log(src);
        var img = new Image();
        img.src = src;
        img.onload = function() {
            callback();
        }
        dataSet.push(img);
    }



    function callback() {
        status++;
        console.log(status);
        if (status == 52) {
            for (i = 0; i < 52; i++) {
                var temp = dataSet[i];
                gif.addFrame(temp, { delay: 100 });
            }
            gif.render();
        }
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