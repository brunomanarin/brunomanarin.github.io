var pontos = [];
var a = [];
var nyc;

function preload(){
  nyc = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/nyc.jpg');
}

function setup(){
	canvas = createCanvas(windowWidth,windowHeight+200);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  for(let i = 0; i < 1000; i++){
    pontos[i] = new ponto();
  }
}
function draw(){
  background(135,206,250, 40);
  tint(255, 30);
  image(nyc,0,0,width,height);
  fill(255,10);
  noStroke();
  for(let i = 0; i<pontos.length; i++){
    pontos[i].renderizar();
    pontos[i].afastar();
    pontos[i].move();
  }
  for(let i = 0; i<a.length; a++){
    a[i].renderizar();
  }


}
function mousePressed() {
  let p = new ponto();
  pontos.push(p);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(135,206,250, 40);
  for(let i = 0; i<30;i++){
    a[i] = new ponto();
  }
}


function ponto(){
  this.x = random(0,width);
  this.y = random(0,height);
  this.raio = 200;
  this.renderizar = function(){
    ellipse(this.x,this.y,this.raio,this.raio);
  }
  this.afastar = function(){
    if (mouseX > this.x-this.raio && mouseX < this.x+this.raio && 
      mouseY > this.y-this.raio && mouseY < this.y+this.raio) {
      this.x=random(0,width);
      this.y=random(0,height);
    }
    if(this.x>width || this.y>height){
      this.x = random(0,width);
      this.y = random(0,height);
    }
    if(this.x<0 || this.y<0){
      this.x += random(0,width);
      this.y += random(0,height);
    }
  }
  this.move = function(){
    this.x += random(0.5,1.5);
    this.y += random(0.5,1.5);
  }
}
