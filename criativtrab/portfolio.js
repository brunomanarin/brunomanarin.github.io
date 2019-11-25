
let player;
let objs = [];
let obj2;
let txtHandler;
let bg;
let vegs = []
function setup(){
	vegs[0] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Other%20Vegetation/tree01.png")
	vegs[1] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Other%20Vegetation/tree02.png")
	vegs[2] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Other%20Vegetation/tree03.png")
	createCanvas(800,600);
	bg = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/background.png")
	player = new Player(0,height-100,50,100);
	txtHandler = new Text();
	for(let i=0;i<9;i++){
		objs[i] = new SceneObject(x=width*i+50,y=50,w=600,h=400);
	}
}
function draw(){
	image(bg, 0, 0, width, height);
	noStroke()
	if(player.x-player.width<width*6){
	 translate(-player.x+50, 0)
	}else{
		translate(-width*6,0)
	}
	objectProps();
	txtHandler.loadTexts();
	player.init();

}
function objectProps(){
	objs.forEach(obj =>{
		obj.render();
	})
}
