
let player;
let objs = [];
let txtHandler;
let bg;
function setup(){
	createCanvas(800,600);
	bg = loadImage("https://opengameart.org/sites/default/files/background0.png")
	player = new Player(0,height-100,50,100);
	txtHandler = new Text();
	for(let i=0;i<9;i++){
		objs[i] = new SceneObject(x=width*i+50,y=50,w=600,h=400);
	}
}
function draw(){
	image(bg, 0, 0, width, height);
	translate(-player.x+50, 0)
	objectProps();
	txtHandler.loadTexts();
	player.init();

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function objectProps(){
	objs.forEach(obj =>{
		obj.render();
	})
}
