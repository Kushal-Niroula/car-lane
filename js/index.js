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
var scoreBoard = document.getElementById("score");
var para = document.getElementsByClassName("score")[0];
var hs = document.getElementById("hs");
var highscore = 0;


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
        scoreBoard.innerHTML=score;
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
    acc=acc+0.003;
if(lanePosition>=20){
    lanePosition=-40;
}
for (var j=lanePosition ; j<canvas.height; j=j+60){
    drawLane(129,j);
    drawLane(261,j);
}
}

setInterval(function(){
    for (var l=0;l<Math.ceil(score+1/10);l++){
    let posx1 = randomObs().x;
    let posy1 = randomObs().y;
    obs.forEach(function(ob){
        if (posx1 == ob.x && Math.abs(posy1-ob.y) <=70 ){
                posy1= posy1 - 75;
        }
        if(posx1 != ob.x && Math.abs(posy1-ob.y)<=140){
            posy1 = ob.y - 180;
        }
    })

    obs.push({
       x:posx1,
       y:posy1, 
       img:randomObs().img

    })}

},2500);

function checkCollision(x1,y1,x2,y2,w,h){
    if (x1+ w >= x2 && x1 <= x2 + 2 && y1 + h >= y2 && y1 <= y2 + h) {
        isGameOver =true;
        if(score > highscore){
            highscore = score;
        }
            hs.innerHTML= "Highscore";
            para.style.backgroundColor="red";
            score.innerHTML = highscore;
            
}
}








