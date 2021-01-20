play = document.getElementById("play");
play.addEventListener('click',main);

/* main function to execute when the game is starts or replayed */

function main(){

    /* defining in game parameters */
    var lanePosition = 0;
    var obs = [];
    var isGameOver = false;
    var acc = 0;
    var score = 0;
    const carWidth = 50;
    const carHeight = 70;
    const laneWidth = 129;
    const initialSpeed = 4;
    let k = 0;


    var highscore = parseInt(localStorage.getItem("Highscore"));
    if (!highscore){
        highscore = 0;
    }


    var playerCar = {
        x:36,
        y:550,
        w:50,
        h:70
    }




    /* accessing and setting up  DOM styles */

    start = document.getElementsByClassName("start")[0];
    canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    canvas.height = 650;
    canvas.width = 400;
    var scoreBoard = document.getElementById("score");
    
    var hs = document.getElementById("hs");
    player = document.getElementById("player");
    obs1 = document.getElementById("obs1");
    obs2 = document.getElementById("obs2");
    over = document.getElementById("game-over");
    replay = document.getElementById("replay");
    board = document.getElementsByClassName("score")[0];
    start.style.display = "none";
    over.style.display = "none";

    canvas.style.display = "block";
    board.style.display = "block";

    canvas.style.backgroundColor = "#9d9c9b";
    scoreBoard.innerHTML = score;

    /* animation starts */
    requestAnimationFrame(update);

    /* function to update the animation */
    function update(){

        ctx.clearRect(0,0,400,650);

        lane();

        drawImg(player,playerCar.x,playerCar.y,playerCar.w,playerCar.h);
        k = 0;
        obs.forEach(function(ob){
    
            drawImg(ob.img,ob.x,ob.y,carWidth,carHeight);
            ob.y = ob.y + 1 + acc;
            if(ob.y>(playerCar.y + playerCar.h)){
                score++;
                obs.splice(k,1);
                scoreBoard.innerHTML = score;
            }

        checkCollision(playerCar.x,playerCar.y,ob.x,ob.y,carWidth,carHeight);
        k++;
        }       
        )
        if(!isGameOver){
            requestAnimationFrame(update);
        }
    }
     

    /* function to draw lanes */
    function drawLane(x,y){
        ctx.fillStyle = "yellow";
        ctx.fillRect(x,y,6,40);    

    }

    /*function to draw image */
    /* parameters x,y image dom, x,y coordinate , width and height to be rendered */
    function drawImg(img,x,y,w,h){
        ctx.drawImage(img,x,y,w,h);

    }

    /* handles control */
    document.addEventListener('keyup',function(e){
        if(e.code ==="ArrowRight"){
        if ((playerCar.x + laneWidth) < canvas.width){ 
        playerCar.x = playerCar.x + laneWidth;
    }
    }
    if(e.code === "ArrowLeft"){
        if ((playerCar.x - laneWidth) > 0){ 
        playerCar.x = playerCar.x - laneWidth;
    }
    }
        
    })

    /* function to generate random obstacles parameter */
    function randomObs(){
        return({
        x:(Math.floor(Math.random() * 3) * laneWidth) + 36, /*spawning in one of the lanes */
        y:Math.floor((Math.random() * 40) - 40), /* spawning above the screen randomly*/
        img: Math.floor(Math.random() * 2) == 0 ? obs1 : obs2
        })

    }

    /* function to move and draw lane */
    function lane(){
        lanePosition = lanePosition + initialSpeed + acc;
        acc = acc + 0.003;
    if(lanePosition >= 20){
        lanePosition = -40;   /* lane starting above the screen */
    }
    for (var j = lanePosition ; j < canvas.height; j=j+60){
        drawLane(laneWidth,j);
        drawLane(canvas.width - laneWidth,j);
    }
    }

    /* setinterval to generate obstacles */
    setInterval(function(){
        for (var l = 0;l < Math.ceil((score+1)/10);l++){
        let posx1 = randomObs().x;
        let posy1 = randomObs().y;
        obs.forEach(function(ob){
            if (posx1 == ob.x && Math.abs(posy1-ob.y) <= carHeight ){
                    posx1 = ob.x - 2* carHeight;
            }
            if(posx1 != ob.x && Math.abs(posy1-ob.y)<=carHeight){
                posy1 = ob.y - 3.2 * carHeight;
            }
        })

        obs.push({
        x:posx1,
        y:posy1, 
        img:randomObs().img

        })}

    },2500);

    /* rectangular collision detection function */
    /* parameters x1, y1 and x2,y2 coordinates of car , width and height of car */

    function checkCollision(x1,y1,x2,y2,w,h){
        if (x1+ w >= x2 && x1 <= x2 + 2 && y1 + h >= y2 && y1 <= y2 + h) {
            isGameOver = true;
            if(score > highscore){
                highscore = score;
                localStorage.setItem('Highscore',highscore); /*adding the highscore in local storage */
            }
            hs.innerHTML = highscore;
            gameOver();
                
    }
    }

    /* function to handle when car collides */
    function gameOver(){
        canvas.style.display = "none";
        over.style.display = "block";

    }

    /* event listener to handle replay button after game over */ 
    replay.addEventListener('click',function(){
        main();
    })



}