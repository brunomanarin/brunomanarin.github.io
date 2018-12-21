var primeiraGota = [];
var img;
var bonecoDeNeve;
var bonecosDeNeve = [];
var canvas;
function setup(){
	if (windowWidth>600) {
	  canvas = createCanvas(windowWidth,windowHeight+1500);
	} else{
		canvas = createCanvas(windowWidth,windowHeight+3000);
	}
  	  canvas.position(0,0);
  	  canvas.style('z-index','-1')
	//for(let i = 0; i<primeiraGota.length; i++){
	//primeiraGota[i]= new gotaDeChuva();
	//
	bonecoDeNeve = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/snowman1.png");
	img = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/snow.png");
}
function draw(){
	background(52.9, 80.8, 92.2);
	if(windowWidth>600){
		image(img,0,0, windowWidth, windowHeight+200);
		push();
		imageMode(CENTER);
		image(bonecoDeNeve,width/2,windowHeight+900, 150, 200);
		pop();	
		if(mouseIsPressed){
			bonecosDeNeve.push(new boneco(mouseX, mouseY,150, 200));
		}
	}
	if(random(1)<0.9){
		primeiraGota.push(new gotaDeChuva());
		}
	for(let i = 0; i<primeiraGota.length; i++){
	primeiraGota[i].renderizar();
	primeiraGota[i].gravidade();
	primeiraGota[i].reset();
	}
	for(let i = 0; i<bonecosDeNeve.length; i++){
	bonecosDeNeve[i].aparecer();
	}
	if(primeiraGota.length>600){
		primeiraGota.splice(0,1);
	}
}

function gotaDeChuva(){
	this.y = random(height);
	this.x = random(width);
	this.pos = createVector(this.x,this.y);
	this.renderizar = function(){
		ellipse(this.pos.x,this.pos.y,5,5);
		fill(255);
		noStroke();
	}
	this.gravidade = function(){
		this.pos.y += random(4);
	}
	this.reset = function(){
		if(this.pos.y>height){
			this.pos.y = random(-200, -100);
		}
	}
}

function boneco(x,y, tamanhox, tamanhoy){
	this.aparecer = function(){
		push();
		imageMode(CENTER);
		image(bonecoDeNeve, x, y, tamanhox, tamanhoy);
		pop();
	}
}
