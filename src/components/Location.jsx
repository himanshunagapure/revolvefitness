import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Location() {
  const containerRef = useRef(null);
  const leftCol = useRef(null);
  const rightCol = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(leftCol.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: containerRef.current, start: "top 75%" } });
      gsap.fromTo(rightCol.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, scrollTrigger: { trigger: containerRef.current, start: "top 75%" } });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: 'var(--near-black)', padding: '96px 0' }}>
      <div className="container">
        <h2 className="bebas text-center" style={{ fontSize: '48px', color: 'white', marginBottom: '48px' }}>COME IN. BREAK LIMITS.</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          <div ref={leftCol} style={{ flex: '1 1 50%', minWidth: '300px', height: '400px', backgroundColor: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--primary-red)">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div ref={rightCol} style={{ flex: '1 1 40%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <h4 className="bebas" style={{ fontSize: '24px', color: 'white', marginBottom: '10px' }}>ADDRESS</h4>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>123 Champion Blvd,<br/>Suite 100, Fitness City</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <h4 className="bebas" style={{ fontSize: '24px', color: 'white', marginBottom: '10px' }}>HOURS</h4>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>Mon-Fri: 5:00 AM - 11:00 PM<br/>Sat-Sun: 6:00 AM - 9:00 PM</p>
            </div>
            <div style={{ marginBottom: '32px' }}>
              <h4 className="bebas" style={{ fontSize: '24px', color: 'white', marginBottom: '10px' }}>CONTACT</h4>
              <p style={{ color: 'var(--primary-red)', fontSize: '16px', fontWeight: 'bold' }}>(555) 123-4567</p>
              <p style={{ color: '#666', fontSize: '14px' }}>info@revolvefitness.com</p>
            </div>
            <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>GET DIRECTIONS &rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
