var estrelaTeste = [];
var x = 0;
var y = 0;
var a = 0;
var x2 = 0;
var y2 = 0;
var r2 = 300;
var a2 = 0;
var nuvemTeste = [];

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  reset();
  resetNuvem();
  sun = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/sun.png");
  moon = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/moon.png");
  cloud = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/cloud.png");
}

function draw() {
  //  background(200);
  // translate(width / 2, height / 2);
  // translate(p5.Vector.fromAngle(millis() / 1000, 40));
  // ellipse(0, 0, 20, 20);
  var hora = hour();
  corCeuAzul = map(y,150,-150, 0,255);
  corCeuVerde = map(y,150,-150, 0 ,170);
  movimentoNuvem = map(y,-100,-400,0,width);
  horaDoDia = map(hora,0,24,0,6.3);
   background(0,corCeuVerde,corCeuAzul);
   push();
   translate(width / 2, height);
   var r = width/2;
    x = r * cos(a);
    y = r * sin(a);
    image(sun, -12+x, -40+y, 90,90);
    a += 0.01;
    if(a>6.3){
    	a = 0;
    }
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
    } 
    print(horaDoDia);
    //else{
    // 	push();
    // 	for(var i = 0; i<5 ; i++){
    // 		nuvemTeste[i].renderizar();
   	// 		nuvemTeste[i].mover();
   	// 	}
    // 	pop();
    // }
    // print(y);


}

function estrela(){
	this.x = random(0,width);
	this.y = random(0,height);
	this.tamanho = 3;
	this.mostrar = function(){
		ellipse(this.x, this.y, this.tamanho,this.tamanho);
		fill(255);
	};
	this.mover = function(){
		this.x+=10;
	};
}
function nuvem(){
	this.x = random(100);
	this.y = random(100);
	this.renderizar = function(){
		image(cloud, this.x,this.y,400,300);
	}
	this.mover = function(){
		for(var a = 0; a<width; a++){
			this.x +=random(0.007);
		}
		if(this.x>width){
			this.x=0;
		}
	}
}
function reset(){
	for (var i = 0; i < 40; i++) {
		estrelaTeste[i] = new estrela();
	}
}
function resetNuvem(){
	for (var i = 0; i < 5; i++) {
		nuvemTeste[i] = new nuvem();
	}
}