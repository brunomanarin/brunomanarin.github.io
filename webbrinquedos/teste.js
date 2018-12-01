var estrelaTeste = [];
var luaTeste;
var planetas = [];

function setup(){
	canvas = createCanvas(windowWidth,windowHeight);
	canvas.position(0,0);
  	canvas.style('z-index','-1');
	reset();
	inicializaPlanetas();
	luaTeste = new lua();
}


function draw(){
	//colorBlue=map(mouseY,windowHeight/2,360,0,255);
	//colorGreen=map(mouseY,windowHeight/2,360,0,170);
  	background (0);
	for (var i = 0; i < 40; i++) {
		estrelaTeste[i].mostrar();
	}
	luaTeste.mostrar();
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

function lua(){
	this.x = random(0,windowWidth);
	this.y = random(0,windowHeight/2);
	this.mostrar = function(){
		ellipse(mouseX, mouseY, 50,50);
		fill(255);
	};
}

function planeta(){
	this.x = random(0,windowWidth);
	this.y = random(0,windowHeight);
	this.tamanho = 30;
	this.mostrar = function(){
		ellipse(this.x, this.y, this.tamanho,this.tamanho);
	};
	this.mover = function(){
		this.x+=10;
	};
}

function mouseDragged(){
	let numeroAleatorio = random(1);
	for (var i = 0; i < 40; i++) {
		estrelaTeste[i].mover();
	}
	reset();
	if (numeroAleatorio>0.1){
		planetas[2].mostrar();

	}
}

function reset(){
	for (var i = 0; i < 40; i++) {
		estrelaTeste[i] = new estrela();
	}
}

function inicializaPlanetas(){
	for (var i = 0; i < 5; i++) {
		planetas[i] = new planeta();
	}
}

