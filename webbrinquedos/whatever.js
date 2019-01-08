var venus;
var a = 0.5;

function preload() {
  venus = loadModel('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/venuslowpoly.obj');
}
function setup(){
	createCanvas(400,400,WEBGL);
}
function draw(){
	translate(0,100);
	background(170);
	rotateX(5);
	rotateZ(a);
	model(venus)
	a += 0.07;
	console.log(a);
}