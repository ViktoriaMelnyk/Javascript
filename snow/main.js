class SnowFlake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0;
        this.alpha = 0;
        this.reset();
    }

    reset() {
        this.radius = this.randBetween(1, 3);
        this.alpha = this.randBetween(0.3, 0.9);
        this.x = this.randBetween(0, window.innerWidth);
        this.y = this.randBetween(-window.innerHeight, -this.radius);
        this.vx = this.randBetween(-2, 5);
        this.vy = this.randBetween(0, 1);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }

    randBetween(min, max) {
        return min + Math.random() * (max - min);
    }
}
class Snow {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.onResize();
        window.addEventListener('resize', () => {
            this.onResize();
        });

        this.updateBound = this.update.bind(this);
        requestAnimationFrame(this.updateBound);

        this.createSnowFlakes();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createSnowFlakes() {
        this.snowFlakesNum = window.innerWidth;
        this.snowFlakes = [];
        for (let i = 0; i < this.snowFlakesNum; i++) {
            this.snowFlakes.push(new SnowFlake());
        }
    }

    update() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.snowFlakes.forEach((snowFlake) => {
            snowFlake.update();

            // draw snow flake
            this.ctx.save();
            this.ctx.fillStyle = '#FFF';
            this.ctx.beginPath();
            this.ctx.arc(snowFlake.x, snowFlake.y, snowFlake.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.globalAlpha = snowFlake.alpha;
            this.ctx.fill();
            this.ctx.restore();
        });

        requestAnimationFrame(this.updateBound);
    }
}

// snow
new Snow();