import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { LightSweep, LightStreak, Particles, ChevronStack } from './Decorations';

export default function Manifesto() {
  const containerRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(quoteRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top center" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ height: '100vh', backgroundColor: 'var(--deep-black)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LightSweep />
      <LightStreak opacity={0.25} />
      <Particles count={40} clusterPosition="bottom" />

      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '200px', backgroundColor: 'rgba(229,53,53,0.1)', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '200px', backgroundColor: 'rgba(229,53,53,0.1)', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', padding: '0 5%' }}>

        {/* Editorial quote block with left red border */}
        <div ref={quoteRef} style={{ position: 'relative', paddingLeft: '32px' }}>
          {/* Thick left red border */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            background: 'linear-gradient(to bottom, #E53535, rgba(229,53,53,0.3))',
            borderRadius: '2px'
          }} />

          {/* Line 1 — white */}
          <div style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(52px, 9vw, 110px)',
            color: '#ffffff',
            letterSpacing: '0.04em',
            lineHeight: 0.95,
            display: 'block'
          }}>
            NO LIMITS.
          </div>

          {/* Line 2 — red with slight skew */}
          <div style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(52px, 9vw, 110px)',
            color: '#E53535',
            letterSpacing: '0.04em',
            lineHeight: 0.95,
            display: 'block',
            transform: 'skewX(-3deg)',
            transformOrigin: 'left center'
          }}>
            NO EXCUSES.
          </div>

          {/* Line 3 — white again */}
          <div style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(40px, 7vw, 84px)',
            color: '#ffffff',
            letterSpacing: '0.04em',
            marginTop: '8px',
            opacity: 0.9
          }}>
            JUST RESULTS.
          </div>

          {/* Divider and brand */}
          <div style={{ width: '80px', height: '1px', backgroundColor: 'white', opacity: 0.8, marginTop: '32px', marginBottom: '16px' }} />
          <p style={{ fontSize: '14px', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Revolve Fitness</p>
        </div>

        {/* ChevronStack — right of the text block, vertically centered */}
        <ChevronStack
          direction="right"
          color="#ffffff"
          size={32}
          style={{ flexShrink: 0 }}
        />
      </div>
    </section>
  );
}
