//canvas variables
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
//game variables 
var turnLeft = false,
    turnRight = false,
    turnUp = false,
    turnDown = false;
var flag = true;
var playerX = 40,
    playerY = 240;
var arrX = [],
    arrY = [];
var arrmX = [],
    arrmY = [];
var num = 0;
var loseFlag = false,
    movingFlag = false;
var score = 0;
//moving and controling 
document.addEventListener('keydown',keyUP , false);
document.addEventListener('keyup',keyDOWN , false);
function keyUP(e) {
    if(e.keyCode === 37) turnLeft=true;
    else if(e.keyCode === 38) turnUp=true;
    else if(e.keyCode === 40) turnDown=true;
    else if(e.keyCode === 39) turnRight=true;
}
function keyDOWN(e) {
    if(e.keyCode === 37) turnLeft=false;
    else if(e.keyCode === 38) turnUp=false;
    else if(e.keyCode === 40) turnDown=false;
    else if(e.keyCode === 39) turnRight=false;
}
function check() {
    if(playerX > canvas.width-60) {
        score++;
        playerX = 0;
        playerY = 240;
        movingFlag = false;
        turnUp=false;
    } 
    else if(playerX < 80 && movingFlag) {
        alert('You came back, cause you pussy, so you lose!');
        alert('Your score: '+score);
        document.location.reload();     
    } 
    else if(loseFlag) {
        alert('You lose! Your score: '+score);
        document.location.reload();     
    }
}
//basic drawing functions
function drawBomb(x,y) {
    ctx.beginPath();
    ctx.rect(x, y, 40, 40);
    ctx.fillStyle="#333333";
    ctx.fill();
    ctx.closePath();    
}
function green() {
    ctx.beginPath();
    ctx.rect(0, 0, 80, canvas.height);
    ctx.fillStyle="#00ff00";
    ctx.fill();
    ctx.closePath(); 
}
function meta() {
    ctx.beginPath();
    ctx.rect(canvas.width-80, 0, 80, canvas.height);
    ctx.fillStyle="#00ff00";
    ctx.fill();
    ctx.closePath();  
}
function player() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, 16,0,Math.PI*2);
    ctx.fillStyle="#ffffff";
    ctx.fill();
    ctx.closePath();
}
function cords() {
    ctx.font = "16px arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText('Score: '+score, 100,35);
}
//functions which contain bombs
function loadBombs() {
    while(num<12) {
    var spotX = Math.floor((Math.random() * 570) + 100);
    var spotY = Math.floor((Math.random() * 450) + 1);
    arrX[num] = spotX;
    arrY[num] = spotY;
    var movementX = Math.floor(Math.random()*3) + 1; 
    movementX *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    var movementY = Math.floor(Math.random()*3) + 1; 
    movementY *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    arrmX[num] = movementX;
    arrmY[num] = movementY;  
    num++;
    }
}
function envokeBombs() {
    for(var i=0; i<12; i++) {
        drawBomb(arrX[i], arrY[i]);
    }
}
function bombMove() {
    for(var i=0; i<12; i++) {
        if(arrX[i]+40 > canvas.width-80) {    
            arrmX[i] = -arrmX[i];
        }
        if(arrY[i]+40 > canvas.height) {
            arrmY[i] = -arrmY[i];
        }
        if(arrX[i] < 80) {
           arrmX[i] = -arrmX[i];
        }
        if(arrY[i] < 0) {
           arrmY[i] = -arrmY[i];
        }
    }
}
 function collisionDetection() {
    for(var i=0; i<12; i++) {
        if((playerX >= arrX[i] && playerX <= arrX[i]+40) 
        && (playerY >= arrY[i] && playerY <= arrY[i]+40)){
           loseFlag = true;
        } 
        if((playerX+3 >= arrX[i] && playerX-3<= arrX[i]+40) 
        && (playerY+3 >= arrY[i] && playerY-3 <= arrY[i]+40)){
           loseFlag = true;
        } 
    }
} 
//===================================================
function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    green();
    meta();
    if(flag) {
        loadBombs();
        flag=false;
    }
    envokeBombs();
    bombMove();
    player();
    cords();
    if(turnLeft && playerX-16>0) playerX-=5;
    else if(turnUp && playerY-16>0) playerY-=5;
    else if(turnRight && playerX+16<canvas.width) playerX+=5;
    else if(turnDown && playerY+16<canvas.height) playerY+=5;
    for(var i=0; i<12; i++) {
    arrX[i] += arrmX[i];
    arrY[i] += arrmY[i];  
    }
    if(movingFlag === false) {
        if(playerX >= 85) movingFlag = true;
    }
    collisionDetection();
    check();
    window.requestAnimationFrame(draw);
}
draw();
//setInterval('draw()',1);
