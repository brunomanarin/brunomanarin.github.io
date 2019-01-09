var mountain;
var img;


function preload(){
 mountain = loadModel('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/lowpolymountains.obj');
 img = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/texturewater.jpg');
}


function setup(){
	createCanvas(windowWidth,windowHeight, WEBGL);
	rectMode(CENTER);
}
function draw(){
	background(10);
	camera(0, 0, sin(frameCount * 0.01) * 100, 0, 0, 0, 0, 1, 0);
	ambientLight(255);

	push();
	rotateX(5);
	translate(-width/2,-height/2, 10);
	fill(89, 0, 89);
	for(let x = -500; x<width+1000; x+=100){
		for(let y = 0 ; y<height+1000; y+=100){
			rect(x,y,98,90);
		}
	}
	pop();

	push();
	rotateX(5);
	translate(0,0, -10);
	fill(214, 0, 214);
	rect(0,0,width+1000,height+400);
	pop();

	push();
	translate(0,-150, -600);
	//rotateZ(3.12);
	//rotateX(6);
	scale(40);
	texture(img); 
	model(mountain);
	pop();

}