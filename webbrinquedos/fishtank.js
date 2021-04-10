

let projectiles
let shoot = false

class Jeng{
	constructor(){
		this.pos = {
			x:windowWidth/2,
			y:windowHeight/2
		}
		this.acceleration = {
			x: 0,
			y: 0
		}
	}
	init = () =>{
		ellipse(this.pos.x, this.pos.y, 100, 100)
	}
}
class Player extends Jeng{

	constructor(){
		super()
		this.projectiles = []
	}

	init = () =>{
		push()
			fill(255,255,255)
			ellipse(this.pos.x, this.pos.y, 100, 100)
			stroke(255,255,255)
			line(this.pos.x,this.pos.y,mouseX,mouseY)
		pop()
		if(mouseIsPressed){
			if(this.pos.x > mouseX){
				this.pos.x -= 10
			}
			if(this.pos.x < mouseX){
				this.pos.x += 10
			}
			if(this.pos.y > mouseY){
				this.pos.y -= 10
			}
			if(this.pos.y < mouseY){
				this.pos.y += 10
			}
		}
		if(this.pos.x>windowWidth){
			this.pos.x = windowWidth;
		}
		if (this.pos.y>windowHeight){
			this.pos.y = windowHeight;
		}
	}
}

class Jong extends Jeng{

	constructor(){
		super()
		this.pos = {
			x:200,
			y:200
		}
		this.vision
		this.isChasing = false;
		this.projectiles = []
	}

	init = (player) =>{
		if(this.isChasing){
			let angle = Math.atan2(player.pos.y-this.pos.y, player.pos.x-this.pos.x)
			push()
				fill(255,0,0)
				translate(this.pos.x, this.pos.y)
				rotate(angle)
				this.vision = triangle(0, 0, 100, 100, 100, -100)
			pop()
		} else {
			push()
				fill(0,255,0)
				triangle(this.pos.x, this.pos.y, 300, 300, 300, 100)
			pop()
		}
		ellipse(this.pos.x, this.pos.y, 100, 100)
		if(this.pos.x>windowWidth){
			this.pos.x = windowWidth;
		}
		if (this.pos.y>windowHeight){
			this.pos.y = windowHeight;
		}
		if((player.pos.x >= this.pos.x-150 && player.pos.x <= this.pos.x+150) && (player.pos.y >= this.pos.y-150 && player.pos.y <= this.pos.y+150)){
			this.chase(player)
			shoot = true
		}
	}

	chase = (player) =>{
		this.isChasing = true
		if(this.pos.x > player.pos.x){
			this.pos.x -= 5
		}
		if(this.pos.x < player.pos.x){
			this.pos.x += 5
		}
		if(this.pos.y > player.pos.y){
			this.pos.y -= 5
		}
		if(this.pos.y < player.pos.y){
			this.pos.y += 5
		}
	}

}

class Projectile{
	constructor(x,y,size, vel){

		this.pos = {
			x,
			y
		}
		this.vel = {
			x:vel.x,
			y:vel.y
		}
		this.size = size
		this.angle = {
			x: map(mouseX,0,width,10,-10),
			y: map(mouseY,0,height,10,-10)
		}
	}

	init = () =>{
		ellipse(this.pos.x, this.pos.y, this.size, this.size)
		this.pos.y += 12*this.vel.y; 
		this.pos.x += 12*this.vel.x;
	}
}



let teb
let gud


function setup(){
	let canvas = createCanvas(windowWidth,windowHeight)
	canvas.position(0,0)
	canvas.style('z-index','-1')
	teb = new Player()
	gud = new Jong()
	projectiles = []
}

function draw(){
	background(0)
	teb.init()
	gud.init(teb)
	for(var i = 0; i < projectiles.length; i++ ){
		projectiles[i].init(teb)
		if(projectiles[i].pos.x>windowWidth || projectiles[i].pos.y>windowHeight ||projectiles[i].pos.x < 0 || projectiles[i].pos.y < 0){
			projectiles.splice(i,1)
		}
	}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function getMouseVector(player){
	let mouseXalt = mouseX - player.pos.x;
	let mouseYalt = mouseY - player.pos.y;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

function mousePressed(){
	let mouseVector = getMouseVector(teb);
	console.log(mouseVector)
	projectiles.push(new Projectile(teb.pos.x,teb.pos.y, 10, mouseVector))
}


