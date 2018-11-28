var x = 1;
var y = Math.sqrt(3);
var contador = 0;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  background(140);
  numeroTriangulos = createSlider(0,8,0);
  numeroTriangulos.position(10,10);
}

function draw() {
    y3 = Math.sqrt(3);
    mapeamentoY = map(numeroTriangulos.value(),0,8,0,255);
    //trianguloDividir(400,0,0,0,200,Math.sqrt(3),1, 4);
    trianguloDividir(windowWidth/3.5,windowHeight,750,0,numeroTriangulos.value());
    fill(mapeamentoY);


}

function trianguloDividir(x,y,lado,lvl, max){
   mapeamentoY = map(y3,0,2,0,400);
   if(lvl == max){
    trianguloEquilatero(x,y,lado);
  } else {
    trianguloDividir(x,y,lado/2,lvl+1,max);
    trianguloDividir(x+lado/2,y,lado/2,lvl+1,max);
    trianguloDividir(x+lado/4,y-sin(PI/3)*lado/2,lado/2,lvl+1,max);
  }
  mapeamentoY = map(numeroTriangulos.value(),0,8,0,255);
  fill(mapeamentoY);
}

function trianguloEquilatero(x,y,lado) {
  triangle(x,y, x+lado/2, y -sin(PI/3)*lado, x+lado,y);
}


  /*
  triangle(x1, y1, x2, y2, x3, y3)
  triangle(400, 0, 0, 0, 200, mapeamentoY);
  triangle(200, 0, 0, 0, 100, mapeamentoY/2);
  triangle(200, 0, 400, 0, 300, mapeamentoY/2);
  triangle(100, mapeamentoY/2, 300, mapeamentoY/2, 200, mapeamentoY);

  triangle(100,mapeamentoY/2,300, mapeamentoY/2,200,0)

  triangle(100, 0, 0, 0, 50, mapeamentoY/4);
  triangle(100, 0, 200, 0, 150, mapeamentoY/4);
  triangle(50,mapeamentoY/4 , 150, mapeamentoY/4, 100, mapeamentoY/2);

  //t(0) = triangle(x1, y1, x2, y2, x3, y3)

  //t(1) = triangle(x1/2,y1/2,x2/2,y2/2,x3/2,y3/2)

  //t(2) = triangle(x3T(o),0,T(0)x1,0)*/