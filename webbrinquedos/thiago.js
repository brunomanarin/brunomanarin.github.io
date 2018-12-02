var mySound;

function preload() {
   mySound = loadSound('https://raw.githubusercontent.com/brunomanarin/manarin.xyz/master/th1.ogg');
}

function setup(){
createCanvas(windowWidth,windowHeight);
mySound.play();
}
function draw() {
	background(255);
	text("ficou muito curto", mouseX, mouseY);
	if(mouseIsPressed){
		mySound.play();
	}
}