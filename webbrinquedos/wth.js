var pontos = [];


function setup(){
	canvas = createCanvas(windowWidth,windowHeight+200);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  for(let i = 0; i < 30; i++){
    pontos[i] = new ponto();
  }
}
function draw(){
  background(0);
  for(let i = 0; i<30; i++){
    pontos[i].renderizar();
  }

}
function ponto(){
  this.x = random(0,width);
  this.y = random(0,height);
  this.renderizar = function(){
    ellipse(this.x,this.y,10,10);
  }
  this.afastar = function(){
    if(this.x == mouseX && this.y == mouseY){
      this.x -=10;
      this.y -=10;
    }
  }
}
