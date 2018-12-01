var novaLua;
var x = 0;
var y = 0;
var r = 150;
var a = 0;
var x2 = 0;
var y2 = 0;
var r2 = 150;
var a2 = 0;

function setup() {
  createCanvas(400, 400);
  novaLua = new lua();
  sun = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/sun.png");
}

function draw() {
  //  background(200);
  // translate(width / 2, height / 2);
  // translate(p5.Vector.fromAngle(millis() / 1000, 40));
  // ellipse(0, 0, 20, 20);
  corCeuAzul = map(y,150,-150, 0,255);
  corCeuVerde = map(y,150,-150, 0 ,170);
   background(0,corCeuVerde,corCeuAzul);
   translate(width / 2, height);
    x = r * cos(a);
    y = r * sin(a);
    image(sun, -12+x, -12+y, 60,60);
    a += 0.01;
    y2 = -r * sin(a);
    x2 = -r * cos(a);
    ellipse(x2,y2,20,20);
    


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