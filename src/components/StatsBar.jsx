import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 1000, suffix: '+', label: 'Active Members' },
  { value: 3, suffix: '+', label: 'Expert Trainers' },
  { value: 3, suffix: ' YRS', label: 'Of Champions' },
];

export default function StatsBar() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const blockRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Staggered entrance — blocks slide up from below
      gsap.fromTo(
        blockRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Count-up per stat
      STATS.forEach((stat, i) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate() {
            if (numberRefs.current[i]) {
              numberRefs.current[i].textContent =
                Math.floor(obj.val).toLocaleString('en-US');
            }
          },
          onComplete() {
            if (numberRefs.current[i]) {
              numberRefs.current[i].textContent =
                stat.value.toLocaleString('en-US');
            }
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#E53535',
        padding: '56px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal slash lines */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60%',
            left: `${15 + i * 32}%`,
            width: '1px',
            height: '220%',
            background: 'rgba(255,255,255,0.07)',
            transform: `rotate(${22 + i * 4}deg)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Top edge accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Bottom edge accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'rgba(0,0,0,0.2)',
        pointerEvents: 'none',
      }} />

      {/* Stats grid */}
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 860px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }
        .stat-block {
          text-align: center;
          padding: 0 32px;
        }
        .stat-block:not(:last-child) {
          border-right: 1px solid rgba(255,255,255,0.2);
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 0;
          }
          .stat-block {
            padding: 24px 16px;
            border-right: none !important;
          }
          .stat-block:not(:last-child) {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.15);
          }
        }
      `}</style>
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={(el) => (blockRefs.current[i] = el)}
            className="stat-block"
            style={{
              opacity: 0,
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget.querySelector('.stat-value'), {
                textShadow: '0 0 40px rgba(255,255,255,0.5)',
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget.querySelector('.stat-value'), {
                textShadow: '0 0 0px rgba(255,255,255,0)',
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
          >
            {/* Number row */}
            <div
              className="stat-value"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(48px, 6vw, 72px)',
                color: '#ffffff',
                lineHeight: 1,
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '2px',
                transformOrigin: 'center center',
              }}
            >
              <span ref={(el) => (numberRefs.current[i] = el)}>0</span>
              <span style={{ fontSize: '0.75em' }}>{stat.suffix}</span>
            </div>

            {/* Decorative underline */}
            <div style={{
              width: '32px',
              height: '2px',
              background: 'rgba(255,255,255,0.35)',
              margin: '10px auto 10px',
              borderRadius: '1px',
            }} />

            {/* Label */}
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}