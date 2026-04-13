import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Transformations() {
  const [dragPos, setDragPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    // Auto-cycle every 4 seconds
    const interval = setInterval(() => {
      if (!isDragging.current) {
        const randomPos = Math.random() * 60 + 20; // 20 - 80
        setDragPos(randomPos);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setDragPos(percent);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging.current) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section style={{ backgroundColor: '#0a0a0a', padding: '96px 0' }}>
      <div className="container">
        <h2 className="bebas text-center" style={{ fontSize: '48px', color: 'white', marginBottom: '48px' }}>REAL PEOPLE. REAL RESULTS.</h2>
        
        <div 
          ref={containerRef}
          onMouseDown={() => isDragging.current = true}
          onMouseUp={() => isDragging.current = false}
          onMouseLeave={() => isDragging.current = false}
          onMouseMove={handleMouseMove}
          onTouchStart={() => isDragging.current = true}
          onTouchEnd={() => isDragging.current = false}
          onTouchMove={handleTouchMove}
          style={{ position: 'relative', overflow: 'hidden', height: '384px', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '8px', cursor: 'ew-resize' }}
        >
          {/* Before */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="bebas" style={{ fontSize: '32px', color: '#333' }}>BEFORE</span>
          </div>
          
          {/* After */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', clipPath: `inset(0 ${100 - dragPos}% 0 0)`, transition: isDragging.current ? 'none' : 'clip-path 0.5s ease-out' }}>
             <span className="bebas" style={{ fontSize: '32px', color: 'var(--primary-red)' }}>AFTER</span>
          </div>
          
          {/* Divider */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${dragPos}%`, width: '2px', backgroundColor: 'var(--primary-red)', transform: 'translateX(-50%)', transition: isDragging.current ? 'none' : 'left 0.5s ease-out' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', backgroundColor: 'var(--primary-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
              ↔
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
           <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#ccc', maxWidth: '600px', margin: '0 auto' }}>"Revolve changed my approach entirely. Best trainers in town."</p>
           <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--primary-red)', fontWeight: 'bold' }}>- Sarah K.</p>
        </div>
      </div>
    </section>
  );
}
