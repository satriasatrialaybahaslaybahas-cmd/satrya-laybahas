// =======================
// Efek Ketik Hero
// =======================
const text = "Bryan Laybahas";
let index = 0;
function typeEffect() {
  const element = document.getElementById("typed-text");
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 120);
  }
}
window.onload = typeEffect;

// =======================
// Animasi Fade-in Section
// =======================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
});

// =======================
// Animasi Latar Listrik
// =======================
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
let w, h, particles;

let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});


function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = [];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (Math.random() - 0.5) * 1,
      color: Math.random() > 0.5 ? 'rgba(255,50,50,0.8)' : 'rgba(56,189,248,0.8)'
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > w) p.speedX *= -1;
    if (p.y < 0 || p.y > h) p.speedY *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = p.color;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = Math.random() > 0.5 ? "rgba(255,50,50,0.15)" : "rgba(56,189,248,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", init);
init();
animate();
