import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles, SkewFrame, ChevronStack, DotGrid } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

const TRAINERS = [
  { name: "Alex Morgan", specialty: "CrossFit · Strength", rating: 5.0, image: "/assets/trainers/trainer1.jpeg" },
  { name: "Priya Nair", specialty: "Yoga · Meditation", rating: 5.0, image: "/assets/trainers/trainer2.jpeg" },
  { name: "Rohan Desai", specialty: "Zumba · Cardio", rating: 4.9, image: "/assets/trainers/trainer3.jpeg" }
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('');
}

export default function Trainers() {
  const containerRef = useRef(null);
  const chevronRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.trainer-card');

    const handleMouseEnter = (e) => {
      gsap.to(e.currentTarget, { y: -8, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = (e) => {
      gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: 'power2.out' });
    };

    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // Chevron scroll-enter animation
    if (chevronRef.current) {
      const chevronSvgs = chevronRef.current.querySelectorAll('svg');
      gsap.fromTo(chevronSvgs,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
      );
    }

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section id="trainers" ref={containerRef} style={{ backgroundColor: 'var(--near-black)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <Particles count={25} clusterPosition="bottom" />

      {/* DotGrid — top-right corner */}
      <DotGrid
        rows={3} cols={4} color="#E53535" size={3} gap={8}
        style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 1 }}
      />

      {/* Vertical Label */}
      <div style={{
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'center center',
        fontFamily: 'Bebas Neue',
        fontSize: '13px',
        color: '#555',
        letterSpacing: '0.5em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 10
      }}>
        OUR TEAM // TRAINERS
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Section Heading — two-tone */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', background: '#E53535' }} />
            <span style={{ fontFamily: 'Bebas Neue', fontSize: '11px', color: '#E53535', letterSpacing: '0.4em' }}>
              THE COACHES
            </span>
            <div style={{ width: '40px', height: '1px', background: '#E53535' }} />
          </div>
          <h2 style={{ fontFamily: 'Bebas Neue', letterSpacing: '0.06em', margin: 0, lineHeight: 0.95 }}>
            <span style={{ color: '#ffffff', display: 'block', fontSize: 'clamp(40px, 6vw, 72px)' }}>MEET YOUR</span>
            <span style={{ color: '#E53535', display: 'block', fontSize: 'clamp(40px, 6vw, 72px)', transform: 'skewX(-2deg)', transformOrigin: 'center' }}>COACHES</span>
          </h2>
        </div>

        {/* CSS Grid layout */}
        <style>
          {`
            .trainers-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
              max-width: 1100px;
              margin: 0 auto;
              padding: 0 40px;
            }
            @media (max-width: 1024px) {
              .trainers-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 768px) {
              .trainers-grid { grid-template-columns: 1fr; }
            }
          `}
        </style>

        {/* Trainers Grid */}
        <div className="trainers-grid">
          {TRAINERS.map((trainer, i) => (
            <div key={i} className="trainer-card" style={{
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer'
            }}>
              {/* Top-left L-bracket */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', pointerEvents: 'none', zIndex: 10 }}>
                <div style={{ width: '20px', height: '2px', background: '#E53535' }} />
                <div style={{ width: '2px', height: '20px', background: '#E53535', marginTop: '-2px' }} />
              </div>

              {/* ChevronStack — bottom-right of card */}
              <ChevronStack
                direction="down"
                color="#E53535"
                size={20}
                style={{ position: 'absolute', bottom: '20px', right: '16px', opacity: 0.4, zIndex: 10 }}
              />

              {/* Skewed Photo Frame */}
              <div style={{ padding: '32px 24px 8px', display: 'flex', justifyContent: 'center' }}>
                <SkewFrame direction="left" style={{ width: '160px', height: '200px' }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    outline: '2px solid #E53535',
                    outlineOffset: '-4px',
                  }}>
                    {trainer.image ? (
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : null}
                    {/* Initials fallback overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Bebas Neue',
                      fontSize: '48px',
                      color: '#E53535',
                      pointerEvents: 'none',
                      zIndex: 2,
                      background: trainer.image ? 'transparent' : 'linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)',
                    }}>
                      {!trainer.image ? getInitials(trainer.name) : null}
                    </div>
                  </div>
                </SkewFrame>
              </div>

              {/* Text Content */}
              <div style={{ padding: '20px 24px 52px' }}>
                {/* Red left-border label treatment */}
                <div style={{
                  borderLeft: '3px solid #E53535',
                  paddingLeft: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '26px',
                    color: '#ffffff',
                    letterSpacing: '0.06em',
                    lineHeight: 1.1
                  }}>
                    {trainer.name}
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    color: '#E53535',
                    letterSpacing: '0.3em',
                    marginTop: '4px',
                    textTransform: 'uppercase'
                  }}>
                    {trainer.specialty}
                  </div>
                </div>

                {/* Star rating */}
                <div style={{ color: '#E53535', fontSize: '14px', marginBottom: '16px' }}>
                  {'★'.repeat(Math.floor(trainer.rating))}
                  <span style={{ color: '#333', marginLeft: '8px', fontFamily: 'Inter', fontSize: '12px' }}>
                    {trainer.rating.toFixed(1)}
                  </span>
                </div>

                {/* Red bottom accent line */}
                <div style={{ height: '1px', background: '#E53535', width: '48px', marginBottom: '16px' }} />

                {/* View Profile button */}
                <button style={{
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#888',
                  background: 'transparent',
                  border: '1px solid #2a2a2a',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                  display: 'block',
                  width: '100%',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#E53535';
                  e.currentTarget.style.background = '#E53535';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#888';
                  e.currentTarget.style.borderColor = '#2a2a2a';
                  e.currentTarget.style.background = 'transparent';
                }}>
                  VIEW PROFILE →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
