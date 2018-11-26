function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  var x2 = map(10, 0, 400, height, width);

  push();
  beginShape();
  vertex(250,200);
  vertex(150,200);
  vertex(200,113.397);
  endShape(CLOSE);
  pop();
  
  
  
  
  push();
  beginShape();
  vertex(250,200);
  vertex(200,200);
  vertex(223.8,156.6985);
  endShape(CLOSE);
  pop();
  
  push();
  beginShape();
  vertex(150,200);
  vertex(200,200);
  vertex(176.2,156.6985);
  endShape(CLOSE);
  pop();

  push();
  beginShape();
  vertex(176.2,156.6985);
  vertex(223.8,156.6985);
  vertex(176.2,156.6985);
  endShape(CLOSE);
  pop();

  
  ellipse(mouseX,mouseY,1,1);
  print(mouseX,mouseY);
}