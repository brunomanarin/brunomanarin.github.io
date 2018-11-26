var x = 50;
var y = 50;
var cor = 0;
var red = 0;
var green = 0;
var blue = 0;
var tamanho = 100;
document.addEventListener('contextmenu', event => event.preventDefault());
window.onwheel = function(){ return false; }

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
	rect(x,y,tamanho,tamanho);
	stroke(red,green,blue);
	fill(cor);
		x+=random(10);
		if(x>windowWidth){
			y = random(windowHeight);
			x = 0;
			translate(width / 2, height / 2);
			rotate(PI / 3.0);
		}
		tamanho+=random(5);
		tamanho-=random(5);
		if(tamanho>100 || tamanho<0){
			tamanho = 10;
		}
		cor = random(255);
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