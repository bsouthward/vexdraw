var app = {};

app.$colors = $("canvas.color-palette");
app.colorctx = app.$colors[0].getContext("2d");

app.buildColorPalette = function() {
    var gradient = app.colorctx.createLinearGradient(0, 0, app.$colors.width(), 0);
    
    gradient.addColorStop(0, "rgb(255, 0, 0)");
    gradient.addColorStop(0.15, "rgb(255, 0, 255)");
    gradient.addColorStop(0.33, "rgb(0, 0, 255)");
    gradient.addColorStop(0.49, "rgb(0, 255, 255)");
    gradient.addColorStop(0.67, "rgb(0, 255, 0)");
    gradient.addColorStop(0.84, "rgb(255, 255, 0)");
    gradient.addColorStop(1, "rgb(255, 0, 0)");

    app.colorctx.fillStyle = gradient;
    app.colorctx.fillRect(0, 0, app.colorctx.canvas.width, app.colorctx.canvas.height);

    gradient = app.colorctx.createLinearGradient(0, 0, 0, app.$colors.height());

    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    app.colorctx.fillStyle = gradient;
    app.colorctx.fillRect(0, 0, app.colorctx.canvas.width, app.colorctx.canvas.height);

    app.$colors.mousedown(function(e) {
        $(document).mousemove(function(e) {
            app.colorEventX = e.pageX - ms.$colors.offset().left;
            app.colorEventY = e.pageY - ms.$colors.offset().top;
        });

        app.colorTimer = setInterval(app.getColor, 50);
    }).mouseup(function(e) {
        clearInterval(ms.colorTimer);
        $(document).unbind("mousemove");
    });
};

app.getColor = function(e) {
    var newColor;
    imageData = app.colorctx.getImageData(app.colorEventX, app.colorEventY, 1, 1);
    app.selectedColor = 'rgb(' + imageData.data[4] + ', ' + imageData.data[5] + ', ' + imageData.data[6] + ')';
};
