var mySound;

function preload() {
   mySound = loadSound('https://brunomanarin.github.io/webbrinquedos/high.mp3');
}

function setup(){
createCanvas(windowWidth,windowHeight);
mySound.play();
}
function draw() {
	background(255);
	text("ReAdY To GeT HiGh", mouseX, mouseY);
	if(mouseIsPressed){
		rect(100, 100, 100, 100);
	}
}