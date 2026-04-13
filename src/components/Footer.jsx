import React from 'react';
import { DiagonalSlashes, DotGrid } from './Decorations';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--deep-black)', borderTop: '2px solid var(--primary-red)', padding: '48px 0', position: 'relative', overflow: 'hidden' }}>
      <DiagonalSlashes count={3} opacity={0.06} />

      {/* DotGrid — top-right */}
      <DotGrid
        rows={3} cols={4} color="#E53535" size={3} gap={8}
        style={{ position: 'absolute', top: '20px', right: '40px', opacity: 0.15, zIndex: 1 }}
      />

      <style>
        {`
          .social-link { transition: color 0.3s, text-shadow 0.3s, box-shadow 0.3s; padding: 4px 8px; border-radius: 4px; }
          .social-link:hover { color: var(--pure-white) !important; box-shadow: 0 0 12px rgba(255,107,26,0.5); text-shadow: 0 0 8px rgba(255,107,26,0.5); }
        `}
      </style>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', position: 'relative', zIndex: 10 }}>
        {/* Left */}
        <div>
          <h2 className="bebas" style={{ fontSize: '32px', color: 'var(--primary-red)' }}>REVOLVE</h2>
          <p style={{ fontSize: '12px', color: '#555', marginTop: '10px' }}>HOME OF CHAMPIONS</p>
          <p style={{ fontSize: '12px', color: '#444', marginTop: '20px' }}>&copy; {new Date().getFullYear()} Revolve Fitness. All rights reserved.</p>
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['Classes', 'Trainers', 'Pricing', 'Schedule'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize: '13px', color: '#555', textTransform: 'uppercase', transition: 'color 0.2s', width: 'fit-content' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
              {link}
            </a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
          {['Instagram', 'Facebook', 'YouTube'].map((social) => (
            <a key={social} href="#" className="social-link" style={{ fontSize: '13px', color: '#555', display: 'flex', alignItems: 'center', margin: '0 -8px' }}>
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Red Accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '150px', height: '150px', backgroundColor: 'var(--primary-red)', clipPath: 'polygon(0 100%, 0 0, 100% 100%)', opacity: 0.8, zIndex: 1 }}></div>
    </footer>
  );
}
