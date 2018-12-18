var primeiraGota = [];
var img;
function setup(){
	createCanvas(windowWidth,windowHeight);
	for(let i = 0; i<300; i++){
	primeiraGota[i]= new gotaDeChuva();
	}
	img = loadImage("http://cusp.nyu.edu/wp-content/uploads/2018/01/bokeh-city-lights-wallpaper-3.jpg");
}
function draw(){
	background(0);
	image = (img, 0,0);
	for(let i = 0; i<300; i++){
	primeiraGota[i].renderizar();
	primeiraGota[i].gravidade();
	primeiraGota[i].reset();
	}
}

function gotaDeChuva(){
	this.y = random(height);
	this.x = random(width);
	this.pos = createVector(this.x,this.y);
	this.renderizar = function(){
		ellipse(this.pos.x,this.pos.y,5,5);
		fill(0,50,170);
	}
	this.historico = [];
	for (var i = 0; i < 40; i++) {
		this.historico[i] = this.pos;
		console.log(this.historico.length);
	}
	this.gravidade = function(){
		this.pos.y += random(15);
	}
	this.reset = function(){
		if(this.pos.y>height){
			this.pos.y = random(-200, -100);
		}
	}
}