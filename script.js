const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(100, canvas.height / 2);
    this.color = `hsl(${random(0,360)}, 100%, 60%)`;
    this.radius = random(2,4);
    this.dy = random(4,7);
  }

  update() {
    this.y -= this.dy;
    if (this.y <= this.targetY) {
      for (let i = 0; i < 30; i++) fireworks.push(new Particle(this.x, this.y, this.color));
      return true;
    }
    return false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.dx = random(-3, 3);
    this.dy = random(-3, 3);
    this.life = 100;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.life--;
  }

  draw() {
    ctx.globalAlpha = this.life / 100;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    let f = fireworks[i];
    f.draw();
    if (f.update()) fireworks.splice(i,1);
  }

  if (Math.random() < 0.05) fireworks.push(new Firework());
  requestAnimationFrame(animate);
}

animate();
