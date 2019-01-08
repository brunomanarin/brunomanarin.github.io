var venus;


function preload() {
  venus = loadModel('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/Glock%203d.obj');
}
function setup(){
	createCanvas(400,400,WEBGL);
}
function draw(){
	background(170);
	rotateX(mouseX*0.1);
	rotateY(mouseY*0.1);
	scale(40);
	model(venus)
}