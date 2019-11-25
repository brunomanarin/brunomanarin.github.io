function Player(x,y,w,h){
    this.x= x
    this.y= y
    this.width = w
    this.height = h
    this.jumpThreshold = 0;
    // Idle animation sprites
    this.sprites = []
    this.sprites[0] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/idle/anim1.png")
    this.sprites[1] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/idle/anim2.png")
    this.sprites[2] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/idle/anim3.png")
    this.sprites[3] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/idle/anim4.png")
    // Running animation sprites
    this.spritesRunning = []
    this.spritesRunning[0] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim5.png")
    this.spritesRunning[1] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim6.png")
    this.spritesRunning[2] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim7.png")
    this.spritesRunning[3] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim8.png")
    this.spritesRunning[4] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim9.png")
    this.spritesRunning[5] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim10.png")
    this.spritesRunning[6] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim11.png")
    this.spritesRunning[7] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/run/anim12.png")
    // Jumping animation sprites
    this.spritesJumping = []
    this.spritesJumping[0] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/jump/anim8.png")
    this.spritesJumping[1] = loadImage("https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/criativtrab/assets/Player/jump/anim11.png")

    this.index = 0;
    this.animSpeed = 0.1;
    this.walkSpeed = 0;
    this.jumpSpeed = 0;
    this.walkingBack = false;
    this.falling = false
    this.init = () =>{
        this.render()
        this.walk()
        this.applyBoundaries()
        this.applyGravity()
        //this.cameraView()
        this.animate()
    }
    this.render = () =>{
        //rect(this.x, this.y, this.width, this.height)
        if(this.walkSpeed === 0 && this.jumpSpeed === 0){
            image(this.sprites[floor(this.index) % this.sprites.length], this.x, this.y, this.width, this.height);
        } else if (this.walkSpeed>0 && this.jumpSpeed == 0){
            push()
                image(this.spritesRunning[floor(this.index) % this.spritesRunning.length], this.x, this.y, this.width, this.height);
            pop()
        } else{
            image(this.spritesJumping[1], this.x, this.y, this.width, this.height);
        }
    }
    this.animate = ()=>{
        this.index +=this.animSpeed
    }
    this.walk = () =>{
        if(keyIsDown(87)){
            this.jumpSpeed = 10
            if(this.falling){
                this.y+=this.jumpSpeed
            }
            if(this.y>=height-200){
                this.y-=this.jumpSpeed
            }
            if(this.y === height-200){
                this.falling = true
            }
            if(this.y > height-this.height){
                this.falling = false
            }

        } else{
            this.jumpSpeed = 0
        }
        if(keyIsDown(68) || keyIsDown(65)){
            this.walkSpeed=10
        }else{
            this.walkSpeed=0
        }
        if(keyIsDown(68)){
            this.x+=this.walkSpeed
        }
        if(keyIsDown(65)){
            this.x-=this.walkSpeed
            this.walkingBack = true
        }else{
            this.walkingBack = false
        }
    }
    this.applyBoundaries = () =>{
        if(this.x<0){
            this.x=0
        }
        if(this.y+this.height>height){
            this.y = height-this.height
        }
        if(this.y<0){
            this.y = 0
        }
    }
    this.applyGravity = () =>{
        this.y+=5
    }
    this.cameraView = () =>{
        translate(this.x+50, 0)
    }
}