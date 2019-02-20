var mountain;
var img;
var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
var terrain = [];


function preload(){
 mountain = loadModel('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/lowpolymountains.obj', true);
 img = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/teste.jpeg');
}


function setup(){
	createCanvas(windowWidth,windowHeight, WEBGL);
	rectMode(CENTER);
	cols = w / scl;
	rows = h/ scl;
	for (var x = 0; x < cols; x++) {
	terrain[x] = [];
		for (var y = 0; y < rows; y++) {
		  terrain[x][y] = 0; //specify a default value for now
		}
	}
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

	//translate(0,-150, -600);
	//rotateZ(3.12);
	//rotateX(6);
	//scale(3);
	//texture(img);
	//model(mountain);
	/*Deep Craft
	Deep Craft
	1 year ago
	Hope all the coders are having a good day!!!!!﻿
	8
	The Coding Train*/
	push();
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
	 pop();



}