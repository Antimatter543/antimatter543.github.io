/**
 * Observatory sky: a depth-parallax starfield bent by a gravitational lens.
 *
 * The lens is a real point-mass model. For a star at angular position beta
 * (relative to the lens), its primary image appears at
 *   theta+ = (beta + sqrt(beta^2 + 4 thetaE^2)) / 2
 * and a fainter secondary image at
 *   theta- = (beta - sqrt(beta^2 + 4 thetaE^2)) / 2   (opposite side).
 * Stars close to the lens get pushed out toward the Einstein radius and
 * stretched tangentially, which is what produces the ring.
 *
 * The lens drifts on a slow Lissajous path and eases toward the pointer while
 * it is over the hero. Three star layers give parallax. Colors are read from
 * the CSS custom properties so the light theme renders a parchment star chart.
 */
export class ObservatorySky {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.host = canvas.parentElement;
    this.opts = Object.assign({ starDensity: 0.0003, layers: 3 }, opts);
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pointer = { x: 0.5, y: 0.5, active: false };
    this.parallax = { x: 0, y: 0 };
    this.lens = { x: 0.7, y: 0.22, tx: 0.7, ty: 0.22 };
    this.t = 0;
    this.visible = true;
    this.meteors = [];
    this.nextMeteor = 4 + Math.random() * 6;
    this.readTheme();
    this.resize();
    this.bind();
    this.last = performance.now();
    if (this.reduced) this.draw(0); else this.loop = requestAnimationFrame((n) => this.frame(n));
  }

  readTheme() {
    const cs = getComputedStyle(document.documentElement);
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    this.theme = {
      light,
      bg: cs.getPropertyValue('--color-bg').trim() || (light ? '#f4efe6' : '#0a0a1a'),
      star: light ? '23, 20, 15' : '242, 240, 255',
      accent: cs.getPropertyValue('--accent').trim() || (light ? '#b4531f' : '#f2c27b'),
      accentRgb: light ? '180, 83, 31' : '242, 194, 123',
      violetRgb: light ? '91, 75, 181' : '157, 140, 255',
    };
  }

  resize() {
    const rect = this.host.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = Math.max(1, Math.floor(rect.width));
    this.h = Math.max(1, Math.floor(rect.height));
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = this.w + 'px';
    this.canvas.style.height = this.h + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.thetaE = Math.min(this.w, this.h) * 0.11;
    this.seed();
    if (this.reduced) this.draw(0);
  }

  seed() {
    const count = Math.floor(this.w * this.h * this.opts.starDensity);
    this.stars = [];
    for (let i = 0; i < count; i++) {
      const layer = i % this.opts.layers; // 0 = far, 2 = near
      const depth = (layer + 1) / this.opts.layers;
      this.stars.push({
        x: Math.random() * (this.w + 200) - 100,
        y: Math.random() * (this.h + 200) - 100,
        depth,
        r: (0.35 + Math.random() * 0.9) * (0.6 + depth * 0.7),
        a: 0.3 + Math.random() * 0.7,
        tw: Math.random() * Math.PI * 2,
        tws: 0.4 + Math.random() * 1.2,
        warm: Math.random() < 0.12,
      });
    }
  }

  bind() {
    window.addEventListener('resize', () => this.resize());
    if (window.ResizeObserver) new ResizeObserver(() => this.resize()).observe(this.host);

    this.host.addEventListener('pointermove', (e) => {
      const r = this.host.getBoundingClientRect();
      this.pointer.x = (e.clientX - r.left) / r.width;
      this.pointer.y = (e.clientY - r.top) / r.height;
      this.pointer.active = true;
    });
    this.host.addEventListener('pointerleave', () => { this.pointer.active = false; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
        if (this.visible && !this.reduced && !this.loop) {
          this.last = performance.now();
          this.loop = requestAnimationFrame((n) => this.frame(n));
        }
      }, { threshold: 0.01 }).observe(this.host);
    }
    document.addEventListener('visibilitychange', () => { this.last = performance.now(); });

    new MutationObserver(() => { this.readTheme(); if (this.reduced) this.draw(0); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  frame(now) {
    if (!this.visible) { this.loop = null; return; }
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.t += dt;
    this.step(dt);
    this.draw(dt);
    this.loop = requestAnimationFrame((n) => this.frame(n));
  }

  step(dt) {
    // Parallax eases toward the pointer offset from center.
    const px = this.pointer.active ? this.pointer.x - 0.5 : 0;
    const py = this.pointer.active ? this.pointer.y - 0.5 : 0;
    this.parallax.x += (px - this.parallax.x) * Math.min(1, dt * 2.2);
    this.parallax.y += (py - this.parallax.y) * Math.min(1, dt * 2.2);

    // Lens wanders on a Lissajous path; while the pointer is here it is drawn toward it.
    // Idle path stays in the upper sky so the disc never parks behind the headline.
    const wx = 0.5 + 0.36 * Math.sin(this.t * 0.09) + 0.05 * Math.sin(this.t * 0.31);
    const wy = 0.2 + 0.09 * Math.cos(this.t * 0.07) + 0.03 * Math.cos(this.t * 0.27);
    if (this.pointer.active) { this.lens.tx = this.pointer.x; this.lens.ty = this.pointer.y; }
    else { this.lens.tx = wx; this.lens.ty = wy; }
    const k = this.pointer.active ? 0.9 : 0.35;
    this.lens.x += (this.lens.tx - this.lens.x) * Math.min(1, dt * k);
    this.lens.y += (this.lens.ty - this.lens.y) * Math.min(1, dt * k);

    // Slow drift of the whole sky, per layer.
    for (const s of this.stars) {
      s.x += dt * 2.2 * s.depth;
      if (s.x > this.w + 100) s.x -= this.w + 200;
    }

    // Meteors.
    this.nextMeteor -= dt;
    if (this.nextMeteor <= 0) {
      this.nextMeteor = 7 + Math.random() * 9;
      const fromLeft = Math.random() < 0.5;
      this.meteors.push({
        x: fromLeft ? -40 : this.w * (0.3 + Math.random() * 0.7),
        y: Math.random() * this.h * 0.45,
        vx: (fromLeft ? 1 : -1) * (520 + Math.random() * 260),
        vy: 180 + Math.random() * 120,
        life: 0, max: 0.9 + Math.random() * 0.5,
      });
    }
    for (const m of this.meteors) { m.x += m.vx * dt; m.y += m.vy * dt; m.life += dt; }
    this.meteors = this.meteors.filter((m) => m.life < m.max);
  }

  lensImages(sx, sy) {
    const lx = this.lens.x * this.w, ly = this.lens.y * this.h;
    const dx = sx - lx, dy = sy - ly;
    const beta = Math.hypot(dx, dy);
    if (beta > this.thetaE * 6 || beta < 0.001) return [{ x: sx, y: sy, mag: 1, stretch: 1, ang: 0 }];
    const root = Math.sqrt(beta * beta + 4 * this.thetaE * this.thetaE);
    const tp = (beta + root) / 2;
    const tm = (beta - root) / 2;
    const ux = dx / beta, uy = dy / beta;
    const ang = Math.atan2(uy, ux);
    // Tangential stretch grows as the image approaches the ring.
    const stretch = 1 + Math.min(5, (this.thetaE / Math.max(1, Math.abs(tp - this.thetaE))) * 0.35);
    const magP = Math.min(2.2, tp / beta * 0.8 + 0.2);
    const out = [{ x: lx + ux * tp, y: ly + uy * tp, mag: magP, stretch, ang }];
    if (beta < this.thetaE * 2.2) {
      const magM = Math.min(1, Math.abs(tm) / beta) * 0.6;
      out.push({ x: lx + ux * tm, y: ly + uy * tm, mag: magM, stretch: 1 + stretch * 0.6, ang });
    }
    return out;
  }

  draw(dt) {
    const ctx = this.ctx;
    const { star, accentRgb, violetRgb, light } = this.theme;
    ctx.clearRect(0, 0, this.w, this.h);

    // Nebula wash: one faint violet cloud, one faint gold cloud, both parallaxed.
    const nx = this.w * 0.7 - this.parallax.x * 30, ny = this.h * 0.3 - this.parallax.y * 20;
    let g = ctx.createRadialGradient(nx, ny, 0, nx, ny, Math.max(this.w, this.h) * 0.55);
    g.addColorStop(0, `rgba(${violetRgb}, ${light ? 0.06 : 0.09})`);
    g.addColorStop(1, `rgba(${violetRgb}, 0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, this.w, this.h);
    const gx = this.w * 0.2 + this.parallax.x * 20, gy = this.h * 0.75 + this.parallax.y * 15;
    g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(this.w, this.h) * 0.4);
    g.addColorStop(0, `rgba(${accentRgb}, ${light ? 0.05 : 0.06})`);
    g.addColorStop(1, `rgba(${accentRgb}, 0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, this.w, this.h);

    // Stars, lensed.
    for (const s of this.stars) {
      const sx = s.x + this.parallax.x * -40 * s.depth;
      const sy = s.y + this.parallax.y * -28 * s.depth;
      const tw = this.reduced ? 1 : 0.75 + 0.25 * Math.sin(this.t * s.tws + s.tw);
      const alpha = s.a * tw;
      const color = s.warm ? accentRgb : star;
      for (const im of this.lensImages(sx, sy)) {
        ctx.save();
        ctx.translate(im.x, im.y);
        ctx.rotate(im.ang + Math.PI / 2);
        ctx.scale(im.stretch, 1);
        ctx.beginPath();
        ctx.arc(0, 0, s.r * Math.sqrt(im.mag), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.min(1, alpha * im.mag)})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // The lens itself: a dark disc, a photon-ring glow at the Einstein radius.
    const lx = this.lens.x * this.w, ly = this.lens.y * this.h, tE = this.thetaE;
    g = ctx.createRadialGradient(lx, ly, tE * 0.75, lx, ly, tE * 1.6);
    g.addColorStop(0, `rgba(${accentRgb}, 0)`);
    g.addColorStop(0.35, `rgba(${accentRgb}, ${light ? 0.18 : 0.22})`);
    g.addColorStop(0.5, `rgba(${accentRgb}, ${light ? 0.08 : 0.1})`);
    g.addColorStop(1, `rgba(${accentRgb}, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(lx, ly, tE * 1.6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(lx, ly, tE * 0.42, 0, Math.PI * 2);
    ctx.fillStyle = light ? 'rgba(23, 20, 15, 0.92)' : 'rgba(3, 3, 8, 1)';
    ctx.fill();
    ctx.beginPath(); ctx.arc(lx, ly, tE * 0.42, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${accentRgb}, ${light ? 0.5 : 0.35})`; ctx.lineWidth = 1; ctx.stroke();

    // Meteors.
    for (const m of this.meteors) {
      const p = m.life / m.max, fade = Math.sin(p * Math.PI);
      const len = 90;
      const nx2 = m.vx / Math.hypot(m.vx, m.vy), ny2 = m.vy / Math.hypot(m.vx, m.vy);
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - nx2 * len, m.y - ny2 * len);
      grad.addColorStop(0, `rgba(${star}, ${0.9 * fade})`);
      grad.addColorStop(1, `rgba(${star}, 0)`);
      ctx.strokeStyle = grad; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - nx2 * len, m.y - ny2 * len); ctx.stroke();
    }
  }
}
