function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
 
    this.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
}
 
function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.pointCollectionX = 0;
    this.pointCollectionY = 0;
    this.points = [];
 
    this.update = function () {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
 
            point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
            point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;
 
            point.update();
        }
    };
 
    this.shake = function () {
        var randomNum = Math.floor(Math.random() * 5) - 2;
 
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
            if (d < 50) {
                this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
                this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
            }
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
        }
    };
 
    this.draw = function (bubbleShape, reset) {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            if (point === null)
                continue;
 
            if (window.reset) {
                this.pointCollectionX = 0;
                this.pointCollectionY = 0;
                this.mousePos = new Vector(0, 0);
            }
 
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY, reset);
        }
    };
 
    this.reset = function (bubbleShape) {};
}
 
function Point(x, y, z, size, color) {
    this.curPos = new Vector(x, y, z);
    this.color = color;
 
    this.friction = document.Friction;
    this.rotationForce = document.rotationForce;
    this.springStrength = 0.1;
 
    this.originalPos = new Vector(x, y, z);
    this.radius = size;
    this.size = size;
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);
 
    this.update = function () {
        var dx = this.targetPos.x - this.curPos.x;
        var dy = this.targetPos.y - this.curPos.y;
        // Orthogonal vector is [-dy,dx]
        var ax = dx * this.springStrength - this.rotationForce * dy;
        var ay = dy * this.springStrength + this.rotationForce * dx;
 
        this.velocity.x += ax;
        this.velocity.x *= this.friction;
        this.curPos.x += this.velocity.x;
 
        this.velocity.y += ay;
        this.velocity.y *= this.friction;
        this.curPos.y += this.velocity.y;
 
        var dox = this.originalPos.x - this.curPos.x;
        var doy = this.originalPos.y - this.curPos.y;
        var dd = (dox * dox) + (doy * doy);
        var d = Math.sqrt(dd);
 
        this.targetPos.z = d / 100 + 1;
        var dz = this.targetPos.z - this.curPos.z;
        var az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;
 
        this.radius = this.size * this.curPos.z;
        if (this.radius < 1) this.radius = 1;
    };
 // There should be an option on the page for hearts or bubbles //
    this.draw = function (bubbleShape, dx, dy) {
        ctx.fillStyle = this.color;
        if (bubbleShape == "square") {
            ctx.beginPath();
            ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
        } else if (bubbleShape == "heart") {
		ctx.strokeStyle = "#000000";
		
		var x = this.curPos.x + dx;
		var y = this.curPos.y + dy;
		var r = this.radius / 40;
		x -= 75 * r;
		y -= 75 * r; 
    		ctx.beginPath();
    		ctx.moveTo(x+75*r, y+40*r);
    		ctx.bezierCurveTo(x+75*r, y+37*r, x+70*r, y+25*r, x+50*r, y+25*r);
    		ctx.bezierCurveTo(x+20*r, y+25*r, x+20*r, y+62.5*r, x+20*r, y+62.5*r);
    		ctx.bezierCurveTo(x+20*r, y+80*r, x+40*r, y+102*r, x+75*r, y+120*r);
    		ctx.bezierCurveTo(x+110*r, y+102*r, x+130*r, y+80*r, x+130*r, y+62.5*r);
    		ctx.bezierCurveTo(x+130*r, y+62.5*r, x+130*r, y+25*r, x+100*r, y+25*r);
    		ctx.bezierCurveTo(x+85*r, y+25*r, x+75*r, y+37*r, x+75*r, y+40*r);
    		ctx.fill();
		ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(this.curPos.x + dx, this.curPos.y + dy, this.radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
}
 
function makeColor(hslList, fade) {
    var hue = hslList[0] /*- 17.0 * fade / 1000.0*/ ;
    var sat = hslList[1] /*+ 81.0 * fade / 1000.0*/ ;
    var lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/ ;
    var result = "hsl(" + hue + "," + sat + "%," + lgt + "%)";
    return result;
}
 
function phraseToHex(phrase) {
    var hexphrase = "";
    for (var i = 0; i < phrase.length; i++) {
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    return hexphrase;
}
 
function initEventListeners() {
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
 
    canvas.bind('touchmove', function (e) {
        e.preventDefault();
 
        onTouchMove(e);
    });
    canvas.bind('touchstart', function (e) {
        e.preventDefault();
    });
}
 
function updateCanvasDimensions() {
    //canvas.attr({
      //  height: 1000,
        //width: 1000
    //});
    //canvasWidth = canvas.width();
    //canvasHeight = canvas.height();
    canvasWidth = canvas[0].width = window.innerWidth;
    canvasHeight = canvas[0].height = window.innerHeight;
    console.log(canvasWidth, canvasHeight, "daddy has a big nose!");
    draw();
}
 
function onMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
    }
}
 
function onTouchMove(e) {
    e = e.originalEvent;
    if (pointCollection) {
        pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
    }
}
 
function bounceName() {
    shake();
    setTimeout(bounceName, 30);
}
 
function bounceBubbles() {
    draw();
    update();
    setTimeout(bounceBubbles, 30);
}
 
function draw(reset) {
    var tmpCanvas = canvas.get(0);
 
    if (tmpCanvas.getContext === null) {
        return;
    }
 
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";
 
    if (pointCollection) {
        pointCollection.draw(bubbleShape, reset);
    }
}
 
function shake() {
    var tmpCanvas = canvas.get(0);
 
    if (tmpCanvas.getContext === null) {
        return;
    }
 
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
 
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";
 
    if (pointCollection) {
        pointCollection.shake(bubbleShape);
    }
}
 
function update() {
    if (pointCollection)
        pointCollection.update();
}
 
function drawName(name, letterColors) {
    updateCanvasDimensions();
    var g = [];
    var offset = 0;
 
    function addLetter(cc_hex, ix, letterCols) {
        if (typeof letterCols !== 'undefined') {
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && Object.prototype.toString.call(letterCols[0]) === '[object Array]') {
                letterColors = letterCols;
            }
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && typeof letterCols[0] === "number") {
                letterColors = [letterCols];
            }
        } else {
            // if undefined set black
            letterColors = [[0, 0, 27]];
        }
 
        if (document.alphabet.hasOwnProperty(cc_hex)) {
            var chr_data = document.alphabet[cc_hex].P;
            var bc = letterColors[ix % letterColors.length];
 
            for (var i = 0; i < chr_data.length; ++i) {
                point = chr_data[i];
 
                g.push(new Point(point[0] + offset,
                    point[1],
                    0.0,
                    point[2],
                    makeColor(bc, point[3])));
            }
            offset += document.alphabet[cc_hex].W;
        }
    }
 
    var hexphrase = phraseToHex(name);
 
    var col_ix = -1;
    for (var i = 0; i < hexphrase.length; i += 2) {
        var cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
        if (cc_hex != "A20") {
            col_ix++;
        }
        addLetter(cc_hex, col_ix, letterColors);
    }
 
    for (var j = 0; j < g.length; j++) {
        g[j].curPos.x = (canvasWidth / 2 - offset / 2) + g[j].curPos.x;
        g[j].curPos.y = (canvasHeight / 2 - 105) + g[j].curPos.y;
        g[j].originalPos.x = (canvasWidth / 2 - offset / 2) + g[j].originalPos.x;
        g[j].originalPos.y = (canvasHeight / 2 - 105) + g[j].originalPos.y;
    }
 
    pointCollection = new PointCollection();
    pointCollection.points = g;
    initEventListeners();
}
 
window.reset = false;
 
$(window).mouseleave(function () {
    window.reset = true;
});
 
$(window).mouseenter(function () {
    window.reset = false;
});
 
var canvas = $("#myCanvas");
var canvasHeight;
var canvasWidth;
var ctx;
var pointCollection;
 
document.rotationForce = 0.0;
document.Friction = 0.85;

var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];
 
setTimeout(updateCanvasDimensions, 30);
