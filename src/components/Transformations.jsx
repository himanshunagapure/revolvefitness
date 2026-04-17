import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const transformations = [
  {
    id: 1,
    image: '/assets/credibility/before-after-m1.jpeg',
    name: 'Marcus T.',
    quote: "Revolve's systematic approach to strength training helped me shed 15kg while gaining significant muscle mass. The industrial vibe and expert coaching are unmatched.",
    stat: '15KG LOST | 12 WEEKS'
  },
  {
    id: 2,
    image: '/assets/credibility/before-after-w1.jpg',
    name: 'Sarah K.',
    quote: "I finally found a place that understands my goals. The transformation wasn't just physical; I've gained a level of confidence I never had before.",
    stat: '8% BODY FAT DROP | 6 MONTHS'
  }
];

export default function Transformations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragPos, setDragPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const activeData = transformations[currentIndex];

  useEffect(() => {
    // Auto-cycle slider position every 6 seconds
    const interval = setInterval(() => {
      if (!isDragging.current) {
        gsap.to({ val: dragPos }, {
          val: Math.random() * 40 + 30, // 30 - 70
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: function () {
            setDragPos(this.targets()[0].val);
          }
        });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [dragPos]);

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

  const switchTransformation = (index) => {
    gsap.to('.transformation-content', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex(index);
        setDragPos(50);
        gsap.to('.transformation-content', { opacity: 1, duration: 0.3 });
      }
    });
  };

  return (
    <section style={{ backgroundColor: '#0a0a0a', padding: '120px 0', borderTop: '1px solid #222' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="bebas" style={{ fontSize: '64px', color: 'white', letterSpacing: '4px', marginBottom: '16px' }}>
            REAL PEOPLE. <span style={{ color: 'var(--primary-red)' }}>REAL RESULTS.</span>
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary-red)', margin: '0 auto' }}></div>
        </div>

        <div className="transformation-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Slider Side */}
          <div
            ref={containerRef}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onMouseMove={handleMouseMove}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { isDragging.current = false; }}
            onTouchMove={handleTouchMove}
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '500px',
              aspectRatio: '1/1',
              borderRadius: '4px',
              cursor: 'ew-resize',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              border: '1px solid #333'
            }}
          >
            {/* Before (Left Side of Composite Image) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${activeData.image})`,
              backgroundSize: '200% 100%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }}>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '4px 12px', borderRadius: '2px' }}>
                <span className="bebas" style={{ fontSize: '18px', color: 'white', letterSpacing: '1px' }}>BEFORE</span>
              </div>
            </div>

            {/* After (Right Side of Composite Image) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${activeData.image})`,
              backgroundSize: '200% 100%',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
              clipPath: `inset(0 0 0 ${dragPos}%)`,
              transition: isDragging.current ? 'none' : 'clip-path 0.5s ease-out'
            }}>
              <div style={{ position: 'absolute', bottom: '20px', right: '20px', backgroundColor: 'var(--primary-red)', padding: '4px 12px', borderRadius: '2px' }}>
                <span className="bebas" style={{ fontSize: '18px', color: 'white', letterSpacing: '1px' }}>AFTER</span>
              </div>
            </div>

            {/* Divider Handle */}
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${dragPos}%`,
              width: '2px',
              backgroundColor: 'var(--primary-red)',
              transform: 'translateX(-50%)',
              zIndex: 10,
              transition: isDragging.current ? 'none' : 'left 0.5s ease-out'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-red)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 0 20px rgba(255,0,0,0.4)',
                cursor: 'grab'
              }}>
                <span style={{ fontSize: '20px' }}>↔</span>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div style={{ color: 'white' }}>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ color: 'var(--primary-red)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '14px' }}>SUCCESS STORY</span>
              <h3 className="bebas" style={{ fontSize: '48px', marginTop: '8px', marginBottom: '4px' }}>{activeData.name}</h3>
              <p style={{ color: '#666', fontSize: '18px', fontWeight: 'bold' }}>{activeData.stat}</p>
            </div>

            <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '3px solid var(--primary-red)', marginBottom: '40px' }}>
              <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#ccc', fontStyle: 'italic' }}>
                "{activeData.quote}"
              </p>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {transformations.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => switchTransformation(index)}
                  style={{
                    width: index === currentIndex ? '48px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: index === currentIndex ? 'var(--primary-red)' : '#333',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  title={`View ${item.name}`}
                />
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <button className="bebas" style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '12px 32px',
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'black'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'white'; }}
              >
                START YOUR TRANSFORMATION
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 968px) {
          .transformation-content {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}} />
    </section>
  );
}
