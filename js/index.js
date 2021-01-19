canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.height = 650;
canvas.width = 400;
player = document.getElementById("player");
obs1 = document.getElementById("obs1");
obs2 = document.getElementById("obs2");
canvas.style.backgroundColor = "#9d9c9b";
var lanePosition = 0;
var obs = [];
var isGameOver = false;
var acc = 0;
var score = 0;


var playerCar = {
    x:36,
    y:550,
    w:50,
    h:70
}



requestAnimationFrame(update);

function update(){

ctx.clearRect(0,0,400,650);

lane();

drawImg(player,playerCar.x,playerCar.y,playerCar.w,playerCar.h);
var k =0;
obs.forEach(function(ob){
  
    drawImg(ob.img,ob.x,ob.y,50,70);
    ob.y = ob.y + 1 + acc;
    if(ob.y>(playerCar.y+playerCar.h)){
        score++;
        obs.splice(k,1);
    }

checkCollision(playerCar.x,playerCar.y,ob.x,ob.y,50,70);
k++;
}       
 )
if(!isGameOver){
requestAnimationFrame(update);
}
}


function drawLane(x,y){
    ctx.fillStyle = "yellow";
    ctx.fillRect(x,y,6,40);    

}
function drawImg(img,x,y,w,h){
    ctx.drawImage(img,x,y,w,h);

}
document.addEventListener('keyup',function(e){
    if(e.code ==="ArrowRight"){
    if ((playerCar.x+129) < 400){ 
    playerCar.x = playerCar.x+129;
}
}
if(e.code ==="ArrowLeft"){
    if ((playerCar.x-129)>0){ 
    playerCar.x = playerCar.x-129;
}
}
    
})

function randomObs(){
    return({
    x:(Math.floor(Math.random()*3)*129)+36,
    y:Math.floor((Math.random()*40)-40),
    img: Math.floor(Math.random()*2)==0 ? obs1 : obs2
    })

}

function lane(){
    lanePosition=lanePosition+3+acc;
    acc=acc+0.001;
if(lanePosition>=20){
    lanePosition=-40;
}
for (var j=lanePosition ; j<canvas.height; j=j+60){
    drawLane(129,j);
    drawLane(261,j);
}
}
setInterval(function(){
    let posx = randomObs().x;
    let posy = randomObs().y;
    obs.push({
       x:posx,
       y:posy, 
       img:randomObs().img

    })
},3000);

function checkCollision(x1,y1,x2,y2,w,h){
    if (x1+ w >= x2 && x1 <= x2 + 2 && y1 + h >= y2 && y1 <= y2 + h) {
        isGameOver =true;
        console.log(score);
    
    }
}








