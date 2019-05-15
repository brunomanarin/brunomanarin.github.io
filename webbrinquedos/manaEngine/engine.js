const worldMap = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,3,0,0,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
	[1,0,0,3,0,3,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[1,0,0,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,3,3,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,3,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,3,3,3,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,2,0,2,2,2,4,4,2,2,2,0,2,4,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0,0,0,0,0,0,0,1],
	[1,0,0,4,3,3,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,3,3,4,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const screenModes = [
    "screen",
    "minimap"
]
    
const floorColor = 130
const ceilingColor = 65

const stripWidth = 1;

let screenMode = screenModes[0]

let screenLines = []

let wallImages = [];
let skybox;
let floorTextue;
let thumbsUp;

let footSteps;
let creepyAmbience;

let player = {
	x : 16,
	y : 10,
	dir : 0,		// the direction that the player is turning, either -1 for left or 1 for right.
	rot : 0,		// the current angle of rotation
	speed : 0,		// is the playing moving forward (speed = 1) or backwards (speed = -1).
	moveSpeed : 0.2,	// how far (in map units) does the player move each step/update
	rotSpeed : 3 * Math.PI / 180	// how much does the player rotate each step/update (in radians)
}

let mapWidth = worldMap[0].length;
let mapHeight = worldMap.length;

let miniMapScale = 8;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

let fov = 60 * Math.PI / 180;

let numRays = Math.ceil(screenWidth / stripWidth);
let fovHalf = fov / 2;

let viewDist = (screenWidth/2) / Math.tan((fov / 2));

let twoPI = Math.PI * 2;


function preload() {
    wallImages = [
        loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/redbrick.png'),
        loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/bluestone.png'),
        loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/purplestone.png'),
		loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/wood.png'),
		loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/eu.png'),
		loadImage('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/pillar.png')
	]
	footSteps = loadSound('https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/sound/footStep2.mp3');
	skybox = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/nightSky.jpg");
	floorTextue = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/vaporFloor.png");
	thumbsUp = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/thumbsup.png");
	creepyAmbience= loadSound("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/sound/creepyAmbience.wav");
}
    
function setup() {
    
    let c = createCanvas(screenWidth, screenHeight);
    c.class("gameCanvas")
    
	creepyAmbience.setVolume(0.02);
	creepyAmbience.loop();
    let dpi = window.devicePixelRatio;
    let canvas = document.getElementById('defaultCanvas0');
    
    let ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false; /// future
    
    canvas.style.width = screenWidth;
	canvas.style.height = screenHeight;
	canvas.style.margin = 0;
	document.body.style.margin = 0;
    
    fill(255)
}

function draw() {
    clear();
    if (keyIsDown(TAB)) {
        screenMode = screenModes[1]
    } else {
        screenMode = screenModes[0]
    }
    
    if (screenMode == screenModes[0]) {
        resetScreenDefaults()
		drawScreen()
    } else if (screenMode == screenModes[1]) {
        resetScreenDefaults()
        drawMinimap()
    }
	move();
}    

function drawScreen() {
    clear();
    noStroke()
    fill(color(floorColor))
    rect(0,screenHeight/2, screenWidth, (screenHeight/2))
    
    fill(color(ceilingColor))
    rect(0,0, screenWidth, (screenHeight/2))
    
    
    screenLines = []
    
    //calculate values
	for (var i=0;i<numRays;i++) {
		// where on the screen does ray go through?
		var rayScreenPos = (-numRays/2 + i) * stripWidth;

		// the distance from the viewer to the point on the screen, simply Pythagoras.
		var rayViewDist = Math.sqrt(rayScreenPos*rayScreenPos + viewDist*viewDist);

		// the angle of the ray, relative to the viewing direction.
		// right triangle: a = sin(A) * c
		var rayAngle = Math.asin(rayScreenPos / rayViewDist);

		castRay(
			player.rot + rayAngle
        )
	}
    
    //render lines
    for (var i=0;i<screenWidth;i+=stripWidth) {
        
        if (screenLines[i] != undefined) {
            let lineWidth = screenLines[i][0]
            let lineHeight = screenLines[i][1]
            let lineTop = screenLines[i][2]
            let lineWallType = screenLines[i][3]
            let lineTexX = screenLines[i][4]
            
            fill(0)
            noStroke()
            
            rect(i, lineTop, stripWidth, lineHeight)
			image(wallImages[lineWallType-1], i, lineTop, stripWidth, lineHeight, (64*lineTexX)/lineWidth ,0, stripWidth, 64);
        }
	}
	if(keyIsDown(32)){
	push();
	imageMode(CENTER);
	image(thumbsUp,width/2,height-(thumbsUp.height/2),width,height);
	pop();
	}
}

function castRay(rayAngle) {
    // first make sure the angle is between 0 and 360 degrees
	rayAngle %= twoPI;
	if (rayAngle < 0) rayAngle += twoPI;

	// moving right/left? up/down? Determined by which quadrant the angle is in.
	var right = (rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25);
	var up = (rayAngle < 0 || rayAngle > Math.PI);

	var wallType = 0;

	// only do these once
	var angleSin = Math.sin(rayAngle);
	var angleCos = Math.cos(rayAngle);

	var dist = 0;	// the distance to the block we hit
	var xHit = 0; 	// the x and y coord of where the ray hit the block
	var yHit = 0;

	var textureX;	// the x-coord on the texture of the block, ie. what part of the texture are we going to render
	var wallX;	// the (x,y) map coords of the block
	var wallY;

	var wallIsHorizontal = false;

	// first check against the vertical map/wall lines
	// we do this by moving to the right or left edge of the block we're standing in
	// and then moving in 1 map unit steps horizontally. The amount we have to move vertically
	// is determined by the slope of the ray, which is simply defined as sin(angle) / cos(angle).

	var slope = angleSin / angleCos; 	// the slope of the straight line made by the ray
	var dXVer = right ? 1 : -1; 	// we move either 1 map unit to the left or right
	var dYVer = dXVer * slope; 	// how much to move up or down

	var x = right ? Math.ceil(player.x) : Math.floor(player.x);	// starting horizontal position, at one of the edges of the current map block
	var y = player.y + (x - player.x) * slope;			// starting vertical position. We add the small horizontal step we just made, multiplied by the slope.

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallX = Math.floor(x + (right ? 0 : -1));
		var wallY = Math.floor(y);

		// is this point inside a wall block?
		if (worldMap[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			dist = distX*distX + distY*distY;	// the distance from the player to this point, squared.

			wallType = worldMap[wallY][wallX]; // we'll remember the type of wall we hit for later
			textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
			if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

			xHit = x;	// save the coordinates of the hit. We only really use these to draw the rays on minimap.
			yHit = y;

			wallIsHorizontal = true;

			break;
		}
		x += dXVer;
		y += dYVer;
	}



	// now check against horizontal lines. It's basically the same, just "turned around".
	// the only difference here is that once we hit a map block, 
	// we check if there we also found one in the earlier, vertical run. We'll know that if dist != 0.
	// If so, we only register this hit if this distance is smaller.

	var slope = angleCos / angleSin;
	var dYHor = up ? -1 : 1;
	var dXHor = dYHor * slope;
	var y = up ? Math.floor(player.y) : Math.ceil(player.y);
	var x = player.x + (y - player.y) * slope;

	while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
		var wallY = Math.floor(y + (up ? -1 : 0));
		var wallX = Math.floor(x);
		if (worldMap[wallY][wallX] > 0) {
			var distX = x - player.x;
			var distY = y - player.y;
			var blockDist = distX*distX + distY*distY;
			if (!dist || blockDist < dist) {
				dist = blockDist;
				xHit = x;
				yHit = y;

				wallType = worldMap[wallY][wallX];
				textureX = x % 1;
				if (up) textureX = 1 - textureX;
			}
			break;
		}
		x += dXHor;
		y += dYHor;
	}

	if (dist) {
		//drawRay(xHit, yHit);

		dist = Math.sqrt(dist);

		// use perpendicular distance to adjust for fish eye
		// distorted_dist = correct_dist / cos(relative_angle_of_ray)
		dist = dist * Math.cos(player.rot - rayAngle);

		// now calc the position, height and width of the wall strip

		// "real" wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
		// thus the height on the screen is equal to wall_height_real * viewDist / dist

		var height = Math.round(viewDist / dist);

		// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
		var width = height * stripWidth;

		// top placement is easy since everything is centered on the x-axis, so we simply move
		// it half way down the screen and then half the wall height back up.
		var top = Math.round((screenHeight - height) / 2);

        var texX = Math.round(textureX*width);

		if (texX > width - stripWidth)
			texX = width - stripWidth;
        
        screenLines.push([width, height, top, wallType, texX]);
        
	}
}
    
function resetScreenDefaults() {
    fill(255)
    stroke(0)
    strokeWeight(1)
}
    
function drawMinimap(){
    //MINIMAP BLOCKS
    fill(200)
    noStroke()
    
    for (var y=0;y<mapHeight;y++) {
		
        for (var x=0;x<mapWidth;x++) {

			var wall = worldMap[y][x];

			if (wall > 0) {
                
                rect(x * miniMapScale, y * miniMapScale, miniMapScale, miniMapScale)
			}
		}
	}
    
    //MINIMAP PLAYER
    fill(color("red"))
    rect(player.x * miniMapScale - 2, player.y * miniMapScale - 2, miniMapScale / 2, miniMapScale / 2)
    
    strokeWeight(2)
    stroke(color("red"));
    line(player.x * miniMapScale, player.y * miniMapScale, (player.x + Math.cos(player.rot) * 2) * miniMapScale, (player.y + Math.sin(player.rot) * 2) * miniMapScale);
}
    
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
		player.dir = -1;
    } else if (keyCode === RIGHT_ARROW) {
		player.dir = 1;
    }
    
    if (keyCode === UP_ARROW) {
		player.speed = 1;
    } else if (keyCode === DOWN_ARROW) {
		player.speed = -1;
	}
    
    //Refresh Page Override
    if (keyCode === 116) {
        location.reload();
    }
    return false
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        player.dir = 0;
    }
    
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        player.speed = 0;
    }
    
    return false
}
function walkSound(){
	if(keyIsDown(39) || keyIsDown(38) || keyIsDown(40) || keyIsDown(37)){
		if(!footSteps.isPlaying()){
			footSteps.play();
		}
	} else{
		footSteps.pause();
	}
}

function move() {
	var moveStep = player.speed * player.moveSpeed;	// player will move this far along the current direction vector
	walkSound();
	player.rot += player.dir * player.rotSpeed; // add rotation if player is rotating (player.dir != 0)

	// make sure the angle is between 0 and 360 degrees
	//while (player.rot < 0) player.rot += twoPI;
	//while (player.rot >= twoPI) player.rot -= twoPI;

	var newX = player.x + Math.cos(player.rot) * moveStep;	// calculate new player position with simple trigonometry
	var newY = player.y + Math.sin(player.rot) * moveStep;

	if (isBlocking(newX, newY)) {	// are we allowed to move to the new position?
		return; // no, bail out.
	}

	player.x = newX; // set new position
	player.y = newY;
}

function isBlocking(x,y) {

	// first make sure that we cannot move outside the boundaries of the level
	if (y < 0 || y >= mapHeight || x < 0 || x >= mapWidth)
		return true;

	// return true if the map block is not 0, ie. if there is a blocking wall.
	return (worldMap[Math.floor(y)][Math.floor(x)] != 0); 
}

// Prevent Default TAB
document.addEventListener("keydown", function(e) {
        if (e.keyCode == 9) {
            e.preventDefault();
        }
}, false);
