export class BlackHoleAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.stars = [];
    this.staticHoles = [];
    this.time = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.centerX = 0;
    this.centerY = 0;
    
    this.init();
    this.animate();
  }

  init() {
    this.resize();
    
    // Listen for window resize
    window.addEventListener('resize', () => this.resize());
    
    // Listen for hero section size changes using ResizeObserver
    const heroSection = this.canvas.closest('.hero-section');
    if (heroSection && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.resize();
      });
      resizeObserver.observe(heroSection);
    }
    
    // Track mouse movement
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
    
    // Initialize mouse position to center
    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;
    
    // Create particles with physics properties
    for (let i = 0; i < 100; i++) {
      this.particles.push(this.createParticle());
    }
  }

  resize() {
    // Get the hero section element to match its dimensions
    const heroSection = this.canvas.closest('.hero-section');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    } else {
      // Fallback to window dimensions
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.mouseX = this.centerX;
    this.mouseY = this.centerY;
    
    // Regenerate stars and particles to fit new dimensions
    this.regenerateElements();
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.6 + 0.3
    };
  }

  regenerateElements() {
    // Clear and regenerate background stars
    this.stars = [];
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    // Clear and regenerate static black holes
    this.staticHoles = [];
    for (let i = 0; i < 2; i++) {
      const holeX = Math.random() * this.canvas.width;
      const holeY = Math.random() * this.canvas.height;
      const stars = [];
      
      // Create 30 fixed stars around this black hole
      for (let j = 0; j < 30; j++) {
        const angle = (j / 30) * Math.PI * 2;
        const distance = 35 + Math.random() * 20;
        stars.push({
          x: holeX + Math.cos(angle) * distance,
          y: holeY + Math.sin(angle) * distance,
          size: 0.5 + Math.random() * 0.5,
          opacity: 0.3 + Math.random() * 0.4
        });
      }
      
      this.staticHoles.push({
        x: holeX,
        y: holeY,
        size: 20,
        stars: stars
      });
    }
    
    // Reposition existing particles to fit new canvas size
    this.particles.forEach(particle => {
      particle.x = Math.random() * this.canvas.width;
      particle.y = Math.random() * this.canvas.height;
    });
  }

  animate() {
    // Clear canvas with black background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.time += 0.01;
    
    // Draw static stars
    this.stars.forEach(star => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.4})`;
      this.ctx.fill();
    });
    
    // Draw static black holes
    this.staticHoles.forEach(hole => {
      // Draw the stars first (so they appear behind the black hole)
      hole.stars.forEach(star => {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        this.ctx.fill();
      });
      
      // Draw the black hole
      const gradient = this.ctx.createRadialGradient(
        hole.x, hole.y, 0,
        hole.x, hole.y, hole.size
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.7, 'rgba(25, 25, 25, 0.8)');
      gradient.addColorStop(1, 'rgba(50, 50, 50, 0.3)');
      
      this.ctx.beginPath();
      this.ctx.arc(hole.x, hole.y, hole.size, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });
    
    // Draw cursor black hole
    const gradient = this.ctx.createRadialGradient(
      this.mouseX, this.mouseY, 0,
      this.mouseX, this.mouseY, 30
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.7, 'rgba(30, 30, 30, 0.8)');
    gradient.addColorStop(1, 'rgba(60, 60, 60, 0.3)');
    
    this.ctx.beginPath();
    this.ctx.arc(this.mouseX, this.mouseY, 30, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // Update particles with gravitational attraction
    this.particles.forEach(particle => {
      let totalForceX = 0;
      let totalForceY = 0;
      
      // Calculate gravitational force from cursor black hole
      const mouseDistance = Math.sqrt(
        (this.mouseX - particle.x) ** 2 + (this.mouseY - particle.y) ** 2
      );
      if (mouseDistance > 5) {
        const force = 400 / (mouseDistance * 0.1);
        totalForceX += ((this.mouseX - particle.x) / mouseDistance) * force * 0.001;
        totalForceY += ((this.mouseY - particle.y) / mouseDistance) * force * 0.001;
      }
      
      // Calculate gravitational force from static black holes
      this.staticHoles.forEach(hole => {
        const dx = hole.x - particle.x;
        const dy = hole.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          // Weaker force for static holes
          const force = 200 / (distance * 0.1);
          totalForceX += (dx / distance) * force * 0.001;
          totalForceY += (dy / distance) * force * 0.001;
        }
      });
      
      // Apply total gravitational acceleration
      particle.vx += totalForceX;
      particle.vy += totalForceY;
      
      // Apply damping to prevent particles from moving too fast
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(200, 200, 200, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}