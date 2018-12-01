var estrelaTeste = [];
var x = 0;
var y = 0;
var a = 0;
var x2 = 0;
var y2 = 0;
var r2 = 300;
var a2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
  sun = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/sun.png");
  moon = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/moon.png");
}

function draw() {
  //  background(200);
  // translate(width / 2, height / 2);
  // translate(p5.Vector.fromAngle(millis() / 1000, 40));
  // ellipse(0, 0, 20, 20);
  corCeuAzul = map(y,150,-150, 0,255);
  corCeuVerde = map(y,150,-150, 0 ,170);
   background(0,corCeuVerde,corCeuAzul);
   push();
   translate(width / 2, height);
   var r = width/2;
    x = r * cos(a);
    y = r * sin(a);
    image(sun, -12+x, -40+y, 90,90);
    a += 0.01;
    y2 = -r * sin(a);
    x2 = -r * cos(a);
    image(moon, -12+x2, -12+y2, 60,60);
    pop();
    if(y>0){
    push();
    	for (var i = 0; i < 40; i++) {
			estrelaTeste[i].mostrar();
		}
    	pop();
    } else{
    	push();
    	var randomX = random(width);
    	var randomY = random(height);
    	arc(randomX, randomY, 25 * size, 20 * size, PI + TWO_PI, TWO_PI);
		arc(x + 10, y, 25 * size, 45 * size, PI + TWO_PI, TWO_PI);
		arc(x + 25, y, 25 * size, 35 * size, PI + TWO_PI, TWO_PI);
		arc(x + 40, y, 30 * size, 20 * size, PI + TWO_PI, TWO_PI);
		pop();
    }
    print(y);


}

function lua(){
	this.radius = 150;
	this.a = 0;
	this.x = this.radius*cos(this.a);
	this.y = this.radius*cos(this.a);
	this.renderizar = function(){
		ellipse(this.x,this.y,5,5);
	};
	this.mover = function(){
		this.a += 0.1;
	};
}
function estrela(){
	this.x = random(0,windowWidth);
	this.y = random(0,windowHeight);
	this.tamanho = 3;
	this.mostrar = function(){
		ellipse(this.x, this.y, this.tamanho,this.tamanho);
		fill(255);
	};
	this.mover = function(){
		this.x+=10;
	};
}
function reset(){
	for (var i = 0; i < 40; i++) {
		estrelaTeste[i] = new estrela();
	}
}