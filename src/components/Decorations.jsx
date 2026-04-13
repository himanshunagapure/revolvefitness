import React, { useEffect, useRef, useState } from 'react';
import { useParticles } from '../hooks/useParticles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- SkewFrame: clips children into a parallelogram ---
export function SkewFrame({ children, direction = 'left', style = {} }) {
  const clipLeft = 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)';
  const clipRight = 'polygon(0% 0%, 92% 0%, 100% 100%, 8% 100%)';
  return (
    <div style={{
      clipPath: direction === 'left' ? clipLeft : clipRight,
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  );
}

// --- ChevronStack: stacked chevron arrow motif ---
export function ChevronStack({ direction = 'right', color = '#E53535', size = 24, style = {} }) {
  const chevrons = ['solid', 'outline', 'outline'];
  const rotate = direction === 'left' ? 'rotate(180deg)' : direction === 'down' ? 'rotate(90deg)' : 'none';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', transform: rotate, ...style }} aria-hidden="true">
      {chevrons.map((type, i) => (
        <svg key={i} width={size} height={size * 0.6} viewBox="0 0 24 14" fill="none">
          <polyline
            points="2,2 12,12 22,2"
            stroke={color}
            strokeWidth={type === 'solid' ? 3 : 1.5}
            fill={type === 'solid' ? color : 'none'}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={type === 'solid' ? 1 : 0.5}
          />
        </svg>
      ))}
    </div>
  );
}

// --- DotGrid: diamond dot grid for filling dead space ---
export function DotGrid({ rows = 4, cols = 5, color = '#E53535', size = 4, gap = 10, style = {} }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${size}px)`,
      gap: `${gap}px`,
      pointerEvents: 'none',
      ...style
    }} aria-hidden="true">
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} style={{
          width: size,
          height: size,
          background: color,
          opacity: 0.7,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        }} />
      ))}
    </div>
  );
}

export const Particles = ({ count = 15, clusterPosition = 'center' }) => {
  const containerRef = useParticles(count, clusterPosition);
  return <div ref={containerRef} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', pointerEvents: 'none', zIndex: 0 }} aria-hidden />;
};

export const DiagonalSlashes = ({ count = 2, opacity = 0.06 }) => {
  const [slashes] = useState(() => Array.from({ length: count }).map(() => ({
    width: 200 + Math.random() * 400 + 'px',
    top: Math.random() * 80 + '%',
    left: Math.random() * 80 + '%',
    transform: `rotate(${130 + Math.random() * 10}deg)`
  })));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden>
      {slashes.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          height: '1px',
          backgroundColor: '#fff',
          opacity,
          width: s.width,
          top: s.top,
          left: s.left,
          transform: s.transform,
          transformOrigin: 'center'
        }} />
      ))}
    </div>
  );
};

export const LightStreak = ({ opacity = 1 }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }} aria-hidden>
      <div style={{
        position: 'absolute',
        width: '200%',
        height: '2px',
        background: 'linear-gradient(135deg, transparent 0%, rgba(255,107,26,0.15) 40%, rgba(255,154,60,0.08) 60%, transparent 100%)',
        transform: 'rotate(135deg) translate(-25%, -50%)',
        transformOrigin: 'left center',
        top: '50%',
        left: '0%',
        opacity
      }} />
    </div>
  );
};

export const LightSweep = () => {
    const sweepRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || !sweepRef.current) return;

        const el = sweepRef.current;
        const parent = el.parentElement;

        const anim = gsap.fromTo(el,
            { x: -200 },
            {
                x: () => parent.offsetWidth + 200,
                duration: 0.8,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: parent,
                    start: 'top 60%',
                    once: true
                }
            }
        );

        return () => {
             if (anim.scrollTrigger) anim.scrollTrigger.kill();
             anim.kill();
        };
    }, []);

    return (
        <div ref={sweepRef} style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '200px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
            pointerEvents: 'none',
            zIndex: 10
        }} aria-hidden />
    );
};
