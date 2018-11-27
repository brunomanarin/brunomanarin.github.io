var x = 0;
var y = 0;

function setup(){
	var canvas = createCanvas(windowWidth,windowHeight);
	canvas.position(0,0);
  	canvas.style('z-index','-1');
	background(0);
}
function proximoPonto(){
	var proximoX;
	var proximoY;
	var numeroAleatorio = random(1);

	if(numeroAleatorio < 0.01){
		proximoX =  0;
		proximoY =  0.16 * y;
		} else if(numeroAleatorio < 0.86){
		//2 
		proximoX =  0.85 * x + 0.04 * y;
		proximoY = -0.04 * x + 0.85 * y + 1.6;
		} else if(numeroAleatorio < 0.93){
		//3
		proximoX =  0.20 * x + -0.26 * y;
		proximoY =  0.23 * x +  0.22 * y + 1.6;
		} else {
		// 4 
		proximoX = -0.15 * x + 0.28 * y;
		proximoY =  0.26 * x + 0.24 * y + 0.44;
		}
	x = proximoX;
	y = proximoY;

}

function desenharPonto(){
	var pX = map(x, -2, 4, 0, width);
	var pY = map(y, 0, 10, height, 0);
	point(pX,pY);
	stroke(random(255),random(255),random(255));
	strokeWeight(1);

}

function draw(){
	for( var i = 0 ; i<500; i++){
		desenharPonto();
		proximoPonto();
	}
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
