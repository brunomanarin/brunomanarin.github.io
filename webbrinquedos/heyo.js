function setup(){
	createCanvas(windowWidth,windowHeight);
	rectMode(CENTER);
}
function draw(){
	rect(width/2, height-100,100,500)
	fill(119, 45, 0);
	noStroke();
	push();
	rect(width/2,height-400,30,100);
	rotate(30);
	pop();
}