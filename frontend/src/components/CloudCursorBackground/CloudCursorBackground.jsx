import { useEffect, useMemo, useRef } from 'react';
import './CloudCursorBackground.css';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// Deterministic PRNG so the field looks consistent across renders.
function mulberry32(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function CloudCursorBackground() {
  const containerRef = useRef(null);
  const cloudElsRef = useRef([]);
  const rafRef = useRef(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
    lastMoveAt: 0,
  });

  const dimsRef = useRef({ w: 0, h: 0 });
  const basePxRef = useRef([]);
  const offsetPxRef = useRef([]);

  const clouds = useMemo(() => {
    // Many more blobs for a “cloud field” feel.
    // Coordinates are in percentages; we’ll convert to pixels on resize.
    const rand = mulberry32(1337);
    // Higher count + smaller blobs -> “moving through a ball pit”
    const count = 54;
    const cloudsArr = [];

    for (let i = 0; i < count; i += 1) {
      // Bias a bit away from perfect edges so blobs don’t clip too harshly.
      const xPct = lerp(-5, 105, rand());
      const yPct = lerp(-8, 108, rand());

      const size = lerp(210, 420, Math.pow(rand(), 0.72));
      const blur = lerp(12, 20, rand());

      // Color palette: cool teals/blues + some warmer highlights.
      const huePick = rand();
      const h = huePick < 0.72 ? lerp(180, 265, rand()) : lerp(20, 55, rand());
      const s = lerp(85, 99, rand());
      const l = lerp(60, 78, rand());

      // Since we have many blobs, keep base alpha reasonable.
      const a = lerp(0.12, 0.22, rand());
      const opacity = lerp(0.65, 0.95, rand());

      const driftX = lerp(16, 44, rand());
      const driftY = lerp(14, 40, rand());
      const speed = lerp(0.00016, 0.00028, rand());
      const phase = rand() * Math.PI * 2;

      const influenceRadius = lerp(260, 460, rand());
      const maxShift = lerp(26, 86, rand());

      cloudsArr.push({
        xPct,
        yPct,
        size,
        blur,
        h,
        s,
        l,
        a,
        opacity,
        driftX,
        driftY,
        speed,
        phase,
        influenceRadius,
        maxShift,
      });
    }

    return cloudsArr;
  }, []);

  useEffect(() => {
    const isReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches;

    // If reduced motion or coarse pointer, we still render blobs (for ambience),
    // but we keep cursor interaction off.
    const enableCursorInteraction = !isReducedMotion && !isCoarsePointer;

    const recalc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimsRef.current = { w, h };

      basePxRef.current = clouds.map((c) => ({
        x: (c.xPct / 100) * w,
        y: (c.yPct / 100) * h,
      }));

      offsetPxRef.current = clouds.map(() => ({ x: 0, y: 0 }));

      // Initial positioning.
      for (let i = 0; i < clouds.length; i += 1) {
        const c = clouds[i];
        const b = basePxRef.current[i];
        const node = cloudElsRef.current[i];
        if (!node) continue;
        node.style.transform = `translate3d(${b.x - c.size / 2}px, ${b.y - c.size / 2}px, 0)`;
        node.style.opacity = String(c.opacity);
      }
    };

    recalc();

    const onResize = () => recalc();
    window.addEventListener('resize', onResize);

    const onPointerMove = (e) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.lastMoveAt = performance.now();
    };

    if (enableCursorInteraction) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    const animate = (now) => {
      const { w, h } = dimsRef.current;
      if (!w || !h) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const pointerAgeMs = now - pointerRef.current.lastMoveAt;
      // Keep interaction “on” briefly after the last pointer move.
      const pointerActive = enableCursorInteraction && pointerAgeMs < 420;

      const bases = basePxRef.current;
      const offsets = offsetPxRef.current;

      for (let i = 0; i < clouds.length; i += 1) {
        const c = clouds[i];
        const node = cloudElsRef.current[i];
        if (!node) continue;

        const b = bases[i];

        // Gentle drift so the background doesn’t feel “static”.
        const driftX = Math.sin(now * c.speed + c.phase) * c.driftX;
        const driftY = Math.cos(now * c.speed * 0.95 + c.phase) * c.driftY;

        const baseX = b.x + driftX;
        const baseY = b.y + driftY;

        let targetX = 0;
        let targetY = 0;
        let influence = 0;

        if (pointerActive) {
          const dx = baseX - pointerRef.current.x;
          const dy = baseY - pointerRef.current.y;
          const dist = Math.hypot(dx, dy) || 0.0001;

          const t = clamp(1 - dist / c.influenceRadius, 0, 1);
          // Make the “near cursor” effect stronger and more punchy.
          influence = Math.pow(t, 0.35);

          // Repel away from the cursor.
          const rep = influence * c.maxShift;
          targetX = (dx / dist) * rep;
          targetY = (dy / dist) * rep;
        }

        const off = offsets[i];
        const smoothing = pointerActive ? 0.24 : 0.1;
        off.x += (targetX - off.x) * smoothing;
        off.y += (targetY - off.y) * smoothing;

        const finalX = baseX + off.x;
        const finalY = baseY + off.y;

        const scale = 1 + influence * 0.22;
        const alphaBoost = influence * 0.42;

        node.style.transform = `translate3d(${finalX - c.size / 2}px, ${
          finalY - c.size / 2
        }px, 0) scale(${scale})`;
        node.style.opacity = String(clamp(c.opacity + alphaBoost, 0.35, 1));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', onResize);
      if (enableCursorInteraction) {
        window.removeEventListener('pointermove', onPointerMove);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [clouds]);

  return (
    <div ref={containerRef} className="cloud-cursor-bg" aria-hidden="true">
      <div className="cloud-cursor-vignette" />
      {clouds.map((c, idx) => {
        const c1 = `hsla(${c.h}, ${c.s}%, ${c.l}%, ${c.a})`;
        const c2 = `hsla(${c.h + 10}, ${c.s}%, ${c.l + 2}%, 0)`;
        const backgroundImage = `radial-gradient(circle at 30% 30%, ${c1}, ${c2} 62%)`;

        return (
          <span
            key={idx}
            ref={(node) => {
              cloudElsRef.current[idx] = node;
            }}
            className="cloud-cursor-blob"
            style={{
              width: `${c.size}px`,
              height: `${c.size}px`,
              filter: `blur(${c.blur}px) saturate(1.35) brightness(1.1)`,
              backgroundImage,
              opacity: c.opacity,
            }}
          />
        );
      })}
    </div>
  );
}

