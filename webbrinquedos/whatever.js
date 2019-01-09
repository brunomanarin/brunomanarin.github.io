var venus;
var bird;
var img;
var cam;
var a = 0.5;

function preload() {
  venus = loadModel('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/venuslowpoly.obj');
  bird = loadModel('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/birdbath.obj');
  img = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/xpfundo.jpg');
}
function setup(){
	createCanvas(400,400,WEBGL);
}
function draw(){
	push();
	translate(-150,150);
	rotateX(5);
	rotateZ(a);
	texture(img);
	normalMaterial();
	scale(0.8);
	model(venus);
	pop();

	push();
	translate(150,150);
	rotateX(5);
	rotateZ(a);
	normalMaterial();
	scale(0.8);
	model(venus);
	pop();

	push();
	normalMaterial();
	rotateX(5);
	scale(3);
	model(bird);
	pop();
	a += 0.07;

	push();
	texture(img);
	plane(400,400);
	pop();
}