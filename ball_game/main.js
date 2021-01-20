const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const startGameBtn = document.getElementById('startGameBtn');
const modal = document.getElementById('modalEl');
const timeCount = document.getElementById('time');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
class Player {
    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

}
let x = canvas.width / 2;
let y = canvas.height / 2;
let vx = 0;
let vy = 0;
let player = new Player(x, y, vx, vy, 40, 'white');
let holes = [];
function init() {
    player = new Player(x, y, vx, vy, 40, 'white');
    holes = []; 
}
class Hole {
    constructor(x, y, radius, color, velosity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velosity = velosity;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.x = this.x + this.velosity.x;
        this.y = this.y + this.velosity.y;
    }
}

function animateHoles() {
    setInterval(() => {
        // console.log('go');
        const radius = Math.random() * (40 - 25) + 25;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const color =
      'rgb(' +
      getRandomInt(255) +
      ',' +
      getRandomInt(255) +
      ',' +
      getRandomInt(255);

        const angle = Math.atan2(canvas.height / 2 - x, canvas.width / 2 - y);
        const velosity = {
            x: Math.cos(angle) * 4,
            y: Math.sin(angle) * 4,
        };
        holes.push(new Hole(x, y, radius, color, velosity));
        // console.log(holes);
    }, 200);
}
let animationId;
function animation() {
    animationId = requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    holes.forEach((hole) => {
        hole.update();
        //end game
        const dist = Math.hypot(player.x - hole.x, player.y - hole.y);
        if (dist - hole.radius - player.radius < 1) {
            console.log('end game');
            cancelAnimationFrame(animationId);
            stopTimer();
            modal.style.display = 'flex';
        }
    });
}
let counter;
function startTimer(time) {
    // eslint-disable-next-line no-unused-vars
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
    }
}
function stopTimer() {
    timeCount.textContent = '0';
    clearInterval(counter);
}
startGameBtn.addEventListener('click', () => {
    init();
    animation();
    animateHoles();
    startTimer(60);
    modal.style.display = 'none';
});


