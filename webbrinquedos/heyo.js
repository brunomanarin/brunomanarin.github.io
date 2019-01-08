// feito por Dan Shiffman-
var cols, rows;
var scl = 100;
var w = 4400;
var h = 6000;

var flying = 0;

var terrain = [];
var canvas;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  	canvas.position(0,100);
  	canvas.style('z-index','-1');
  cols = w / scl;
  rows = h/ scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {

  flying -= 0.06;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -250, 250);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0,0,170);
  translate(0, 50);
  rotateX(PI/3);
  fill(200,200,200, 50);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}