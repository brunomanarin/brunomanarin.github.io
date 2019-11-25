let player;
let objs = [];
let obj2;
let txtHandler;
let bg;
let vegs = [];
let firework = [];
let index = 0;
let speed = 0.1;
let renderFireworks;
function setup() {
  for (let i = 0; i < 7; i++) {
    firework[i] = loadImage(
      "https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/idle/firework_red" +
        i +
        ".png"
    );
  }
  vegs[0] = loadImage(
    "https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Other%20Vegetation/tree01.png"
  );
  vegs[1] = loadImage(
    "https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Other%20Vegetation/tree02.png"
  );
  vegs[2] = loadImage(
    "https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Other%20Vegetation/tree03.png"
  );
  createCanvas(800, 600);
  bg = loadImage(
    "https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/background.png"
  );
  player = new Player(0, height - 100, 50, 100);
  txtHandler = new Text();
  for (let i = 0; i < 9; i++) {
    objs[i] = new SceneObject(
      (x = width * i + 50),
      (y = 50),
      (w = 600),
      (h = 400)
    );
  }
}
function draw() {
  image(bg, 0, 0, width, height);
  noStroke();
  if (player.x - player.width < width * 6) {
    translate(-player.x + 50, 0);
  } else {
    translate(-width * 6, 0);
  }
  objectProps();
  txtHandler.loadTexts();
  player.init();
  if (player.x + player.width > width * 6 + width / 2) {
    renderFireworks = true;
  }
  if(renderFireworks){
	image(
		firework[floor(index) % firework.length],
		width * 6 + 30,
		height - 300,
		150,
		150
	  );
	  image(
		  firework[floor(index) % firework.length],
		  width * 6 + 500,
		  height - 300,
		  150,
		  150
		);
	  animFireworks();
  }
}
function objectProps() {
  objs.forEach(obj => {
    obj.render();
  });
}

function animFireworks() {
  index += 0.1;
}
