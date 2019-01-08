var venus;


function preload() {
  venus = loadModel('../media/venus.obj');
}
function setup(){
	createCanvas(400,400,WEBGL);
}
function draw(){
	background(170);
	rotateX(mouseX*0.1);
	rotateY(mouseY*0.1);
	model(venus);
}