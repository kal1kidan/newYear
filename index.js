// Countdown logic
const countdownEl = document.getElementById('countdown');
const newYearDate = new Date("September 11, 2025 00:00:00").getTime();

const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = newYearDate - now;

  if (distance < 0) {
    clearInterval(interval);
    countdownEl.innerHTML = "🎉 Happy Ethiopian New Year 🎉";
    startConfetti();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Music button
const music = document.getElementById('music');
const playMusicBtn = document.getElementById('playMusic');

playMusicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    playMusicBtn.textContent = "⏸ Pause Music";
  } else {
    music.pause();
    playMusicBtn.textContent = "🎶 Play Music";
  }
});

// Confetti animation
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];

function ConfettiPiece(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = Math.random() * 8 + 4;
  this.speedY = Math.random() * 3 + 2;
  this.speedX = Math.random() - 0.5;
}

function startConfetti() {
  for (let i = 0; i < 200; i++) {
    confettiPieces.push(
      new ConfettiPiece(
        Math.random() * confettiCanvas.width,
        Math.random() * confettiCanvas.height,
        `hsl(${Math.random() * 360}, 100%, 50%)`
      )
    );
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.speedY;
    p.x += p.speedX;
    if (p.y > confettiCanvas.height) p.y = 0;
  });
  requestAnimationFrame(animateConfetti);
}

