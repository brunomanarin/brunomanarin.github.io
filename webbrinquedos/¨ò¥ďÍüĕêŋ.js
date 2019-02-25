var pontos = [];
var a = [];
var nyc;
var ds;
var uu;
var timer = 8;
var sssd;
function preload(){
  sssd = loadSound('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/%C5%A5%C3%9F%C5%86%C3%AE%C4%AB%C5%88%C5%92%C4%B8%C2%A3%C4%99%C5%9E%C4%BB.ogg');
  uu = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/%C4%8E%C3%B3%C4%AB%C3%8D%C5%8B%C5%90%C3%83%C4%B7%C3%B0%C5%A7%C5%B3.png');
  nyc = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/nyc.jpg');
}

function setup(){
	canvas = createCanvas(window.innerWidth, window.innerHeight+300);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  if(width>600){
    for(let i = 0; i < 75; i++){
      pontos[i] = new ponto();
    }
  } else {
    for(let i = 0; i < 75; i++){
      pontos[i] = new ponto();
    }
  }
  ds = new sp();
  eae = select('img');
  //eae.mouseOver(teste);

}
function draw(){
  background(109, 5, 0);
  tint(109, 30);
  if(width>600){
  image(nyc,0,0,width,height);
  } 
  push();
    fill(0);
    ds.renderizar();
  pop();
  fill(255,10);
  noStroke();
  for(let i = 0; i<pontos.length; i++){
    pontos[i].renderizar();
   
    pontos[i].move();
  }
  for(let i = 0; i<a.length; a++){
    a[i].renderizar();
  }
  if(mouseIsPressed){
    image(uu,random(0,width),random(0,height),300,300);
    sssd.setVolume(0.2);
    if(!sssd.isPlaying()){
      sssd.play();
    }

  }
   if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  if (timer == 0) {
    image(uu,300,300,300,300);
  }



}
function teste(){
  eae.remove();
  eae = createImg('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/natal.jpeg');
  eae.id = ('eumesmo');
}


function windowResized() {
  if(width>600){
    resizeCanvas(windowWidth, windowHeight+300);
  } else {
    resizeCanvas(windowWidth, windowHeight+500);
  }

  background(135,206,250, 40);
  for(let i = 0; i<30;i++){
    a[i] = new ponto();
  }
}


function ponto(){
  this.x = random(0,width);
  this.y = random(0,height);
  this.raio = 650;
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
function sp(){
  this.x = random(0,width);
  this.y = random(0,height);
  this.raio = 5;
  this.renderizar = function(){
    rect(this.x,this.y,this.raio,this.raio);
  }
  this.clique = function(){
    let d = dist(mouseX,mouseY,this.x,this.y);
    if(d<this.raio){
      alert('89974524252846334316682037081467192287898088758985538400744773130470289068281347');
    }
  }
}
