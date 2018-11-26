var x = 100;
var y = 100;
var tamanhoCirculo = 55;
var formasGeometricas = ['quad(x, y, 86, 20, 69, 63, 30, 76);','ellipse(x, y, 55, 55);','triangle(x, y, 58, 20, 86, 75);']
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight)
  background(0,240,240);
}

function draw() {
  ellipse(x, y, tamanhoCirculo, tamanhoCirculo);
  if(mouseIsPressed){
  	x = mouseX;
  	y = mouseY;
    tamanhoCirculo += 1;
  	  }
  if (keyIsPressed){
  	fill(random(255),random(255),random(255));
  	clear();
  	background(random(255),random(255),random(240));
    tamanhoCirculo = 55;
  }
   if(tamanhoCirculo > 400){
      text('aperte qualquer botão do teclado', windowWidth/2,windowHeight/2);
  }
}