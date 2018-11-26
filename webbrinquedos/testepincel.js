var x = 100;
var y = 100;
var cor = 0;
var tamanho = 100;
document.addEventListener('contextmenu', event => event.preventDefault());
window.onwheel = function(){ return false; }

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
	ellipse(x,y,tamanho,tamanho);
	if(cor <= 40 ){
		stroke(255);
	} else {
		stroke(0);
	}
	
	fill(cor);
	if(keyIsDown(68)){
		x+=10;
	}
	if(keyIsDown(65)){
		x-=10;
	}
	if(keyIsDown(87)){
		y-=10;
	}
	if(keyIsDown(83)){
		y+=10;
	}
	if(mouseIsPressed){
		if(mouseButton === LEFT){
			tamanho +=5;
		}
		if(mouseButton === RIGHT){
			tamanho -=5;
		}
		if(mouseButton === CENTER){
			x = random(windowWidth);
			y = random (windowHeight);
		}

	}
	if(x>windowWidth){
		x = windowWidth;
	}
	if (y>windowHeight){
		y = windowHeight;
	}
}


function comida(){
	ellipse(random(windowWidth),random (windowHeight), 10,10);
}

function mouseWheel(event) {
	if(event.delta>0){
		cor += 5;
	} else {
		cor -= 5;
	}
}