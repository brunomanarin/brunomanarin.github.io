var pontos = [];
var a = [];
var nyc;
var ds;

function preload(){
  nyc = loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/nyc.jpg');
}

function setup(){
	canvas = createCanvas(window.innerWidth, window.innerHeight+300);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  if(width>600){
    for(let i = 0; i < 1000; i++){
      pontos[i] = new ponto();
    }
  } else {
    for(let i = 0; i < 100; i++){
      pontos[i] = new ponto();
    }
  }
  ds = new sp();
  eae = select('img');
  //eae.mouseOver(teste);

}
function draw(){
  background(135,206,250, 40);
  tint(255, 30);
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
    pontos[i].afastar();
    pontos[i].move();
  }
  for(let i = 0; i<a.length; a++){
    a[i].renderizar();
  }



}
function teste(){
  eae.remove();
  eae = createImg('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/media/natal.jpeg');
  eae.id = ('eumesmo');
}


function mousePressed() {
  let p = new ponto();
  pontos.push(p);
  ds.clique();
}
function windowResized() {
  if(width>600){
    resizeCanvas(windowWidth, windowHeight+200);
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
  this.raio = 250;
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
      alert('ψ ☠̵̢̨̢̢̛̛̛͚͖̩͓͈̭̯̩̹̦̼͉͖͕͎͍͇͖̯̲͖͕̤̳̤͚̤͇̺͉͎̣̮̥̬̅̉̆̉̿̓͋̅͌̊̒͑̓̆̓͒͗̀̿͑̒̓͐͊̐̍̆̐̂̐͌̓̄͗͆̽̀̓̔̈́͗́͛̊̏̄̈́̀̈́͗̉͊̀̄͂̂̈́̓̇͗̍͑̇̀͐͌̈́͋̉̎̄͒̈̐͋̏͒̍͑̑͘̕͘̕̚̕̚͜͝͠͝͠͝͝ͅ ̷̨̧̢̧̧̨̛̙̟̗͕̳̮̝̖̣̥̘̯̭̤̪͕͔̦̣͈̦̯̜̯͕̥͙̖̩̬̯͓̲̮͎̟̙͔͎̺̤̣͚̫͓̳̜̮̝͚͔̲͎̀̋͌͗̆̉̿̋͋͒͒̈́͒̃̀̎̎́̉̑̒̚͜͝͠͝͠ͅͅͅͅͅͅ⛥̸̥̖̩̜̦̰͔̖̗͋͆͋̋̇̾̎͐͆͂͛̌̋͋̽͒̎̐̒̉̈́̋̌̆͐̇̈̽̑̈́͗͋̽̎͗͂̏͂̂͐͛͒̐̾̑̔̂͐̔̐̾̓̌̈́̊̒̋̋́͛̿̇́̒͛̐̅͊͆͋̉̏͂̀̉̒́̊̉͒̄͘̕̚̚͘̚͘̚̕̚͜͠͝͠͝͠͝͝ ̴̢̧̛̲̣̞̦͖̫̮̜̼̼̰̱̳̫̙̺̣̻̬̭̣̟͖͉̋̒̈́̌̓̈́͑̍͑̄̊̓̄͛̈̅̂̓͂͌͜͜͜͜͠͠ͅ⛧̵̧̢̨̨̛̛͚̲̯̮͕͚̳̩̟̬̖̯̱̹͇͇̟̦̙̠͕̥̥̱͖̼͚̩̱̻͎͇͈̺̥͍͎͇̱̳̼̦͙̜̫̮͎͖̗̲͔̝͙̺͚̖̳̱̃̅͊̆̿́̓̏̂̓̀̓͌̆̇̍̈́̅̀̓̆̈́̽́̑̂̑́͌̌̀̀̈́̑͘͘͘͜͜͝͝ ̶̡̨̨̡̡͎̖͖̲̻͉̱͕͓̠̤͇̦͎̜͖̬̝̰̝̩͚̺̫̦͕͙̬̬͈̟̤̭̱̬̝̺̝̰̙̳͚͇͚̙̿̈́͋̈́̎͌̐̓͒̽̒͋̒̌̕͜͜ͅͅͅ');
      window.location.replace("ěŊğıŞĺÓĘêčŹ¸õ.html");
    }
  }
}
