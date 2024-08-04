//run sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

//jump sound 
var jumpSound = new Audio("jump.mp3");

//dead sound
var deadSound = new Audio("dead.mp3")

function keyCheck(event){

    //Enter Key
    if(event.which == 13){
        if (runWorkerId == 0){
            blockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlock, 100);
            runWorkerId = setInterval(run, 100);
            runSound.play();

            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
        }
    }  

    //Space Key
    if(event.which == 32){
        if(jumpWorkerId == 0){
            clearInterval(runWorkerId);
            runSound.pause();

            runWorkerId = -1;
            jumpWorkerId = setInterval(jump, 100);
            jumpSound.play();
        }
    }
}

//Run Function
var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;
function run(){
    runImageNumber++; 
    if(runImageNumber == 9){
        runImageNumber = 1;
    }
    player.src = "Run ("+runImageNumber+").png";
}

//Move Background

var background= document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground(){
    backgroundX = backgroundX - 20
    background.style.backgroundPositionX = backgroundX + "px";
}

//Jump Function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop =395;
function jump(){
    jumpImageNumber++; //2
    if(jumpImageNumber <= 7){
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";

    }
    if(jumpImageNumber >= 8){
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";

    }
    if(jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run, 100);
        runSound.play();

        if (backgroundWorkerId == 0) {
            backgroundWorkerId = setInterval(moveBackground, 100);
        }

        if (blockWorkerId == 0) {
            blockWorkerId = setInterval(createBlock,100);
        }

        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock,100);
        }

        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore,100);
        }
    }
   player.src = "Jump (" + jumpImageNumber + ").png";
}

//create block
var blockWorkerId = 0;
var blockMarginLeft = 700;
var blockNumber = 1;

function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockNumber;
    blockNumber++;
    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = gap + blockMarginLeft;
    block.style.marginLeft = blockMarginLeft + "px";
    background.appendChild(block);
}

//move block 
var moveBlockWorkerId = 0;

function moveBlock(){
    for (var i = 1; i <= blockNumber; i++) {

         var currentBlock = document.getElementById("block" + i);
         var currentMarginLeft = currentBlock.style.marginLeft;
         var newMarginLeft = parseInt(currentMarginLeft) - 20;
         currentBlock.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft < 120 & newMarginLeft > 40){
            if (playerMarginTop > 310) {
         
                 clearInterval(runWorkerId);
                 runSound.pause();

                 clearInterval(backgroundWorkerId);
                 clearInterval(blockWorkerId);
                 clearInterval(moveBlockWorkerId);
                 clearInterval(scoreWorkerId);
                 clearInterval(jumpWorkerId);
                 jumpWorkerId = -1;

                 setInterval(dead, 100);
                 deadSound.play();
             
            }
        }
    }

}

//update score
var score = document.getElementById("score")

var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){

    newScore++;
    score.innerHTML = newScore;

}

//dead
var deadImageNumber = 1;

function dead() {
    deadImageNumber++;

    if (deadImageNumber == 11){
        deadImageNumber = 10;
        player.style.marginTop = "400px";
        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }
    
    player.src = "Dead (" +deadImageNumber + ").png";
}

//reload 
function reload(){
    location.reload();
}