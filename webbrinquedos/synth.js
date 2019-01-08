var image;


function preload(){
 image = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/synthsun.jpg');
}


function setup(){
	createCanvas(windowWidth,windowHeight, WEBGL);
	rectMode(CENTER);
}
function draw(){
	background(89, 0, 89);
	camera(0, 0, sin(frameCount * 0.01) * 100, 0, 0, 0, 0, 1, 0);


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

}