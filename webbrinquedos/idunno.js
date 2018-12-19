var primeiraGota = [];
var img;
function setup(){
	createCanvas(windowWidth,windowHeight);
	//for(let i = 0; i<primeiraGota.length; i++){
	//primeiraGota[i]= new gotaDeChuva();
	//}
	img = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/teste.png");
}
function draw(){
	console.logI=(img);
	//image(img,0,0);
	background(110);
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
}

function gotaDeChuva(){
	this.y = random(height);
	this.x = random(width);
	this.pos = createVector(this.x,this.y);
	this.renderizar = function(){
		ellipse(this.pos.x,this.pos.y,5,5);
		fill(255);
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