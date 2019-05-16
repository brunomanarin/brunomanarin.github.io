const worldMap = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
let mapWidth = worldMap[0].length;
let mapHeight = worldMap.length;
var cnv;
function setup(){
    cnv = createCanvas(480,360);
    button = createButton('Boa noite princesa');
    button.position(500, 30);
    button.mousePressed(renderizarMapaTexto);
}
function draw(){
    drawTileSet(mapWidth,mapHeight);
    console.log(mouseX,mouseY);
}


function drawTileSet(width,height){
    background(0);
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var wall = worldMap[y][x];
            switch(wall){
                case 0:{
                    push();
                    fill(255,255,255);
                    drawSingleTile(x,y,15);
                    pop();
                    break;
                }
                case 1:{
                    push();
                    fill(0,0,255);
                    drawSingleTile(x,y,15);
                    pop();
                    break;
                }
                case 6:{
                    push();
                    fill(0,255,0);
                    drawSingleTile(x,y,15);
                    pop();
                    break;
                }
            }
            

        }
    }
}


function drawSingleTile(x,y,scale){
    rect(x * scale, y * scale, scale, scale);
    if(mouseX>x*scale && mouseX<(x+1)*scale && mouseY>y*scale && mouseY<(y+1)*scale){
        push();
            fill(255,0,0);
            rect(x * scale, y * scale, scale, scale);
        pop();
    }
}

function mousePressed(){
    for (var y = 0; y < mapHeight;y++) {
        for (var x = 0; x < mapWidth; x++) {
            tileClicked(x,y,15);
        }
    }
}
function tileClicked(x,y,scale){
    if(mouseX>x*scale && mouseX<(x+1)*scale && mouseY>y*scale && mouseY<(y+1)*scale && keyIsPressed){
        switch(key){
            case 'a':{
                worldMap[y][x] = 1;
                console.log("oi");
                break;
            }
            case 'b':{
                worldMap[y][x] = 0;
                break;
            }
        }
    }
}
function renderizarMapaTexto(){
    var div = createDiv();
    div.id('mapToText');
    div.style('overflow-y','scroll');
    div.style('width','400px');
    div.style('height','400px');
    var yTemp = 0;
    var asd = document.getElementById('mapToText');
    asd.innerHTML =''
    for (var y = 0; y < mapHeight;y++) {
        for (var x = 0; x < mapWidth; x++) {
            if(yTemp!=y){
                asd.append("\n");
                yTemp=y;
            }
            asd.append(worldMap[y][x]);
        }
    }
}
