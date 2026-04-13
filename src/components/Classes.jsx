import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LightSweep, ChevronStack, DotGrid } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

const CLASSES = [
  {
    area: 'CARDIO AREA',
    name: 'CARDIO',
    video: '/assets/page/cardio.mp4',
    row: 'top',
    skewDirection: 'left',
  },
  {
    area: 'FREE WEIGHTS ZONE',
    name: 'STRENGTH',
    video: '/assets/page/strength-training.mp4',
    row: 'top',
    skewDirection: 'right',
  },
  {
    area: 'STUDIO A',
    name: 'ZUMBA',
    video: '/assets/page/zumba.mp4',
    row: 'bottom',
  },
  {
    area: 'FUNCTIONAL ZONE',
    name: 'CROSSFIT',
    video: '/assets/page/crossfit.mp4',
    row: 'bottom',
  },
  {
    area: 'YOGA STUDIO',
    name: 'YOGA',
    video: '/assets/page/yoga.mp4',
    row: 'bottom',
  },
];

const CLIP_LEFT = 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)';
const CLIP_RIGHT = 'polygon(0% 0%, 94% 0%, 100% 100%, 6% 100%)';

function ClassCard({ cls, height, clipShape }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' });
    gsap.to(card.querySelector('video'), { opacity: 0.9, scale: 1.06, duration: 0.4, ease: 'power2.out' });
    gsap.to(card.querySelector('.card-overlay'), {
      background: 'linear-gradient(to top, rgba(255,107,26,0.85) 0%, rgba(229,53,53,0.45) 45%, transparent 75%)',
      duration: 0.3,
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
    gsap.to(card.querySelector('video'), { opacity: 0.6, scale: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(card.querySelector('.card-overlay'), {
      background: 'linear-gradient(to top, rgba(229,53,53,0.75) 0%, rgba(229,53,53,0.25) 45%, transparent 70%)',
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      className="class-card"
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        clipPath: clipShape || 'none',
        cursor: 'pointer',
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Top-left L-bracket */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 10, left: 10, zIndex: 30, pointerEvents: 'none' }}>
        <div style={{ width: 16, height: 2, background: '#E53535' }} />
        <div style={{ width: 2, height: 16, background: '#E53535' }} />
      </div>

      {/* Bottom-right L-bracket */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 30, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ width: 2, height: 16, background: '#E53535' }} />
        <div style={{ width: 16, height: 2, background: '#E53535' }} />
      </div>

      {/* Video */}
      <video
        src={cls.video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
          transformOrigin: 'center',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="card-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(229,53,53,0.75) 0%, rgba(229,53,53,0.25) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Zone label — top left */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 24,
        fontFamily: 'Inter, sans-serif',
        fontSize: 10,
        color: 'rgba(255,255,255,0.55)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        zIndex: 20,
      }}>
        {cls.area}
      </div>

      {/* Center content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(30px, 4vw, 60px)',
          color: '#ffffff',
          letterSpacing: '0.08em',
          lineHeight: 1,
          textShadow: '0 4px 24px rgba(0,0,0,0.7)',
        }}>
          {cls.name}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 11,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.3em',
          marginTop: 8,
          textTransform: 'uppercase',
        }}>
          GALLERY
        </div>
      </div>

      {/* TRY FREE button — bottom center */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 20,
      }}>
        <button style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: '#ffffff',
          background: '#E53535',
          border: 'none',
          padding: '8px 20px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          borderRadius: 2,
        }}>
          TRY FREE 1 DAY →
        </button>
      </div>

      {/* Chevron — bottom right */}
      <ChevronStack
        direction="down"
        color="#E53535"
        size={18}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 14,
          opacity: 0.35,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default function Classes() {
  const sectionRef = useRef(null);
  const chevronRef = useRef(null);
  const cardRefs = useRef([]);

  const topClasses = CLASSES.filter(c => c.row === 'top');
  const bottomClasses = CLASSES.filter(c => c.row === 'bottom');

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Cards stagger in
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        }
      );

      // Chevron entrance
      if (chevronRef.current) {
        gsap.fromTo(
          chevronRef.current.querySelectorAll('svg'),
          { x: -20, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            },
          }
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="classes"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--deep-black)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LightSweep />

      {/* Dot grids */}
      <DotGrid rows={4} cols={5} color="#E53535" size={4} gap={10}
        style={{ position: 'absolute', top: 60, right: 40, opacity: 0.2, zIndex: 1, pointerEvents: 'none' }} />
      <DotGrid rows={3} cols={4} color="#E53535" size={3} gap={8}
        style={{ position: 'absolute', bottom: 40, left: 40, opacity: 0.2, zIndex: 1, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Chapter marker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 1, background: '#E53535' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            color: '#E53535',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
          }}>
            THE CLASSES
          </span>
        </div>

        {/* Two-tone heading + chevron */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', margin: 0, lineHeight: 0.95 }}>
            <span style={{ color: '#ffffff', display: 'block', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '0.06em' }}>
              WHAT WE
            </span>
            <span style={{
              color: '#E53535',
              display: 'block',
              fontSize: 'clamp(40px, 6vw, 72px)',
              letterSpacing: '0.06em',
              transform: 'skewX(-2deg)',
              transformOrigin: 'left center',
            }}>
              OFFER
            </span>
          </h2>
          <div ref={chevronRef} style={{ marginTop: 18 }}>
            <ChevronStack direction="down" color="#E53535" size={24} />
          </div>
        </div>

        {/* ── ROW 1: Two large skewed cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}>
          {topClasses.map((cls, i) => (
            <div
              key={cls.name}
              ref={el => cardRefs.current[i] = el}
              style={{ opacity: 0 }}
            >
              <ClassCard
                cls={cls}
                height="360px"
                clipShape={cls.skewDirection === 'left' ? CLIP_LEFT : CLIP_RIGHT}
              />
            </div>
          ))}
        </div>

        {/* ── ROW 2: Three smaller cards — no clip ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {bottomClasses.map((cls, i) => (
            <div
              key={cls.name}
              ref={el => cardRefs.current[i + 2] = el}
              style={{ opacity: 0 }}
            >
              <ClassCard cls={cls} height="280px" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}