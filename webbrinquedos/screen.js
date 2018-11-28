var x = 100;
var y = 100;
var cor = 0;
var red = 0;
var green = 0;
var blue = 0;
var tamanho = 100;
document.addEventListener('contextmenu', event => event.preventDefault());
window.onwheel = function(){ return false; }

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
}

function draw() {
	ellipse(x,y,tamanho,tamanho);
	stroke(red,green,blue);
	fill(red,green,blue);
	for(i = 0; i<100; i++){
		x+=random(10);
		if(x>windowWidth){
			x = 0;
		}
		y +=random(10);
		if(y>windowHeight){
			y = 0;
		}
		tamanho+=random(5);
		tamanho-=random(5);
		if(tamanho>100 || tamanho<0){
			tamanho = 10;
		}
		red = random(255);
		green = random(255);
		blue = random(255);

	}
	print(x);
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