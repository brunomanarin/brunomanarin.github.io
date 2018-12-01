function setup(){
	createCanvas(400,400);
	angleMode(DEGREES);
}
function draw(){
    let hora = hour();
    let min = minute();
    let seg = second();

    let fim = map(mouseX,0,400,0,180);
    strokeWeight(8);
    stroke(255,100,150);
    arc(200,200,300,300,fim,0);
    print(fim);
}