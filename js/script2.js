var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var painting = document.getElementById("paint");
//var clear = document.getElementById("clear");
var palette = document.getElementById("palette");
var paint_style = getComputedStyle(painting);
var mouse = {x: 0, y: 0};

canvas.width = parseInt(paint_style.getPropertyValue("width"));
canvas.height = parseInt(paint_style.getPropertyValue("height"));

canvas.addEventListener("mousemove", function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";

canvas.addEventListener("mousedown", function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener("mousemove", onPaint, false);
}, false);

canvas.addEventListener("mouseup", function() {
    canvas.removeEventListener("mousemove", onPaint, false);
}, false);

document.getElementById("clear").addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

function changeColor() {
    var r = parseInt(document.getElementById("red").value, 10),
    g = parseInt(document.getElementById("green").value, 10),
    b = parseInt(document.getElementById("blue").value, 10);

    palette.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
    ctx.strokeStyle = palette.style.backgroundColor;
};

function changeWidth() {
    var w = parseInt(document.getElementById("width").value, 10);
    ctx.lineWidth = w;
};
