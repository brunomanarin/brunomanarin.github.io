
function setup(){
createCanvas(400,400);
background(0);

}
function draw() {
var iteracoesMaximas = 100;



loadPixels();
// z(0) = c
 for(var x = 0;x < 400;x++){
    for(var y = 0;y < 400;y++){


      var parteReal = map(x, 0, 400, -2.5, 2.5);
      var parteImaginaria = map(y, 0, 400, 2.5, -2.5);
      // c = a + bi
      var parteRealC = parteReal;
      // adicionar o c original ao calculo de reiteracao
      var parteImaginariaC = parteImaginaria;
      for(var n = 0; n < iteracoesMaximas;n++){

        // for da funcao quadratica
        // c^2 = (a+bi)*(a+bi)
        // c^2 = a^2+2abi- b^2i^2 (i^2 = -1)
        // c^2 = a^2-b^2+2abi

        // a^2-b^2:
        var elevadosAoQuadrado = parteReal*parteReal - parteImaginaria*parteImaginaria;
        // 2abi sem o i:
        var naoElevado = 2*parteImaginaria*parteReal;
        // 2ab
        parteReal = elevadosAoQuadrado + parteRealC;
        parteImaginaria = naoElevado + parteImaginariaC;

        // c^2 = (a^2 - b^2) <- parte real + (2abi) <- parte Complexa

        // checar se nao tende ao infinito
        // 10 esta como "infinito"
        if(sqrt(parteReal*parteReal + parteImaginaria*parteImaginaria) > 2){
          break;
        }
      }

      var cor = map(n, 0, iteracoesMaximas, 0, 1);
      cor = map(sqrt(cor), 0, 1, 0, 255);

      if(n ==  iteracoesMaximas) {
        cor = 100;
      }




      var pix = (x+y*400)*4;
      pixels[pix + 0] = cor;
      pixels[pix + 1] = cor;
      pixels[pix + 2] = cor;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}



/*
For each pixel (Px, Py) on the screen, do:
{
  x0 = scaled x coordinate of pixel (scaled to lie in the Mandelbrot X scale (-2.5, 1))
  y0 = scaled y coordinate of pixel (scaled to lie in the Mandelbrot Y scale (-1, 1))
  x = 0.0
  y = 0.0
  iteration = 0
  max_iteration = 1000
  while (x*x + y*y < 2*2  AND  iteration < max_iteration) {
    xtemp = x*x - y*y + x0
    y = 2*x*y + y0
    x = xtemp
    iteration = iteration + 1
  }
  color = palette[iteration]
  plot(Px, Py, color)
}
*/

/*
  x0 = map(x, 0, 400, -2.5, 1);
      y0 = map(y, 0, 400, -1, 1);
      while(x*x+y*y<2*2 && iteration<max_iteration){
        xTemporario = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = xTemporario;
        iteration = iteration + 1;
        point(x0, y0);
        point(200,200);
        stroke(255);
        strokeWeight(10);
        print(x);
      }
*/