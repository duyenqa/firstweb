const options = {
    width: window.innerWidth / 2,
    height: window.innerHeight / 2
}

// Get canvas element and context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set initial ball position
let x = 200, y = 150;

//Set initial ball velocity 
let vx = 0, vy = 0;

//Set score
let score = 0;

//set position ground
const paddleHeight = 60;
const paddleWidth = 770;
let paddleX = (options.width - paddleWidth) / 2;

function onChangeVelocityBall() {
    let inputVX = document.getElementById("vxBall").value;
    vx = inputVX;
    let inputVY = document.getElementById("vyBall").value;
    vy = inputVY;
}

function onResetBall() {
    let newVX = document.getElementById("vxBall").value = 0;
    let newResultVX = document.getElementById("outputvx").value = 0;
    vx = newVX;

    let newVY = document.getElementById("vyBall").value = 0;
    let newResultVY = document.getElementById("outputvy").value = 0;
    vy = newVY;

    score = 0;
}

//Set radius ball
let ballRadius = 40;

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

//Draw text
function drawTextText() {
    ctx.font = "40px Consolas";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Ball speed simulation", 160, 60);
}

//background game
function drawBackground() {
    const base_image = new Image();
    base_image.src = "../images/grass.png";
    ctx.drawImage(base_image, 0, 0, 780, 369);
}

//ground
function drawGround() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.closePath();
}

//Draw everything
function draw() {
    canvas.width = options.width;
    canvas.height = options.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawTextText();
    drawScore();
    drawBall();
    drawGround();
}

//Draw text
function drawScore() {
    ctx.font = "40px Consolas";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Score: ${score}`, 300, 120);
}

function updateBall() {
    //when ball detect wall
    if (x + vx > options.width - ballRadius || x + vx < ballRadius) {
        vx = -vx;
        score += 1;
    }

    if (y + vy > options.height - ballRadius - paddleHeight || y + vy < ballRadius - 5) {
        vy = -vy;
        score += 1;
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