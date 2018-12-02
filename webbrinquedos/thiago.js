var mySound;

function preload() {
   mySound = loadSound('https://raw.githubusercontent.com/brunomanarin/manarin.xyz/master/th1.ogg');
}

function setup(){
createCanvas(windowWidth,windowHeight);
mySound.play();
th = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/th.png");
}
function draw() {
	background(255);
	image(th,mouseX,mouseY);
	if(mouseIsPressed){
		mySound.play();
	}
}