import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useParticles(count, clusterPosition = 'center') {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = ''; // clear

    const particles = [];
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.background = 'radial-gradient(circle, var(--ember-glow), transparent)';
        particle.style.pointerEvents = 'none';
        container.appendChild(particle);
        particles.push(particle);
    }
    
    // Animate
    particles.forEach((p) => {
        let startX, startY;
        
        if (clusterPosition === 'center') {
            startX = window.innerWidth / 2 + (Math.random() - 0.5) * 300; // center cluster
        } else if (clusterPosition === 'bottom') {
             startX = Math.random() * window.innerWidth;
        } else if (clusterPosition === 'edges') {
             startX = Math.random() > 0.5 ? Math.random() * 200 : window.innerWidth - Math.random() * 200;
        } else {
             startX = Math.random() * window.innerWidth; // random
        }

        gsap.set(p, {
            x: startX,
            y: 0,
            opacity: 0
        });

        const yDrift = -80 - Math.random() * 120; // 80 to 200

        gsap.to(p, {
            y: yDrift,
            opacity: 0,
            duration: 3 + Math.random() * 3,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 4,
            keyframes: {
                "0%": { opacity: 0 },
                "30%": { opacity: 0.8 },
                "70%": { opacity: 0.8 },
                "100%": { opacity: 0 }
            }
        });
    });

    return () => {
        gsap.killTweensOf(particles);
        container.innerHTML = '';
    };
  }, [count, clusterPosition]);

  return containerRef;
}
