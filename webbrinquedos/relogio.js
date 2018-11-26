function setup(){
	createCanvas(400,400);
}
function draw(){
    let sc = second();
    noFill();
    var end = map(mouseX,0,width,0,6);
    arc(200,200,300,300,0,end);
    text("eae gay", 200, 200);
    color(255)
}