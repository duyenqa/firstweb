const options = {
    width: window.innerWidth / 2,
    height: window.innerHeight / 2
}

// Get canvas element and context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set initial ball position
let x = 250, y = 250;

//Set initial ball velocity 
let vx = 0, vy = 0;

function onChangeVelocityBall() {
    let a = parseFloat(document.getElementById("vxBall").value) || 0;
    let b = parseFloat(document.getElementById("vyBall").value) || 0;
    vx = a;
    vy = b;
}

//Set radius ball
let ballRadius = 30;

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//Draw text
function drawTextText() {
    ctx.font = "48px serif";
    ctx.fillText("Ball speed simulation", 155, 50);
}

//Draw everything
function draw() {
    canvas.width = options.width;
    canvas.height = options.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTextText();
    drawBall();
}

function updateBall() {
    //when ball detect wall
    if (x + vx > options.width - ballRadius || x + vx < ballRadius) {
        vx = -vx;
    }

    if(y + vy > options.height - ballRadius || y + vy < ballRadius){
        vy = -vy;
    }

    //ball is moving 
    x += vx;
    y += vy;
}

function loop() {
    updateBall();
    draw();
    window.requestAnimationFrame(loop);
}

// Start animation
window.requestAnimationFrame(loop);