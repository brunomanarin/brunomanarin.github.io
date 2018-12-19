var primeiraGota = [];
var img;
var bonecoDeNeve;
function setup(){
	  var canvas = createCanvas(windowWidth,windowHeight+200);
  	  canvas.position(0,0);
  	  canvas.style('z-index','-1')
	//for(let i = 0; i<primeiraGota.length; i++){
	//primeiraGota[i]= new gotaDeChuva();
	//
	bonecoDeNeve = loadImage("");
	img = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/snow.png");
}
function draw(){
	background(52.9, 80.8, 92.2);
	if(windowWidth>600){
	image(img,0,0, windowWidth, windowHeight+200);
	}
	if(random(1)<0.9){
		primeiraGota.push(new gotaDeChuva());
		}
	for(let i = 0; i<primeiraGota.length; i++){
	primeiraGota[i].renderizar();
	primeiraGota[i].gravidade();
	primeiraGota[i].reset();
	}
	if(primeiraGota.length>600){
		primeiraGota.splice(0,1);
	}
	if(mouseIsPressed){
		if (mouseButton === LEFT) {
	      image(bonecoDeNeve, mouseX, mouseY, 100,100);
	    }
	    if (mouseButton === RIGHT) {
	      rect(25, 25, 50, 50);
	    }
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
