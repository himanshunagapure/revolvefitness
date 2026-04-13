import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const NAV_LINKS = ['Classes', 'Trainers', 'Pricing', 'Schedule'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  // Scroll background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        gsap.to(navRef.current, { backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(4px)', duration: 0.3 });
      } else {
        gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.3 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;
    if (!menu || !overlay) return;

    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      gsap.set(menu, { display: 'flex' });
      gsap.set(overlay, { display: 'block' });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(menu, { x: '100%' }, { x: '0%', duration: 0.35, ease: 'power3.out' });
      // Stagger links in
      const links = menu.querySelectorAll('.mobile-nav-link');
      gsap.fromTo(links, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.06, delay: 0.15 });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(overlay, { display: 'none' }) });
      gsap.to(menu, { x: '100%', duration: 0.3, ease: 'power3.in', onComplete: () => {
        gsap.set(menu, { display: 'none' });
      }});
    }
  }, [isOpen]);

  // Close menu on link click
  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <style>{`
        .nav-desktop-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
          padding: 4px;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      {/* Main Navbar */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          transition: 'background-color 0.3s',
          padding: '20px 5%',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-red)', fontFamily: '"Bebas Neue", sans-serif', fontSize: '24px', letterSpacing: '0.1em', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--primary-red)" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8L16 0V16L0 8Z" />
            </svg>
            REVOLVE
          </div>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
                {link}
              </a>
            ))}
            <button className="btn-primary btn-join" style={{ padding: '8px 16px', borderRadius: '2px', fontSize: '12px' }}>JOIN NOW</button>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu size={24} color="#fff" />
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 98,
          opacity: 0,
        }}
        aria-hidden="true"
      />

      {/* Mobile slide-in menu panel */}
      <div
        ref={mobileMenuRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(320px, 85vw)',
          height: '100dvh',
          backgroundColor: '#080808',
          borderLeft: '1px solid rgba(229,53,53,0.3)',
          zIndex: 99,
          flexDirection: 'column',
          padding: '24px',
          transform: 'translateX(100%)',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-red)', fontFamily: '"Bebas Neue", sans-serif', fontSize: '22px', letterSpacing: '0.1em' }}>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="var(--primary-red)" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8L16 0V16L0 8Z" />
            </svg>
            REVOLVE
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#888' }}
            aria-label="Close navigation menu"
          >
            <X size={22} color="#888" />
          </button>
        </div>

        {/* Red accent line */}
        <div style={{ width: '32px', height: '2px', background: '#E53535', marginBottom: '32px' }} />

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="mobile-nav-link"
              onClick={handleLinkClick}
              style={{
                display: 'block',
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '32px',
                color: '#ffffff',
                letterSpacing: '0.08em',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.2s',
                opacity: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#E53535'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA at bottom */}
        <button
          className="btn-primary"
          onClick={handleLinkClick}
          style={{ width: '100%', padding: '14px', borderRadius: '2px', fontSize: '13px', letterSpacing: '0.1em', marginTop: '32px' }}
        >
          JOIN NOW
        </button>

        {/* Decorative corner */}
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, right: 0, width: '80px', height: '80px', backgroundColor: '#E53535', clipPath: 'polygon(100% 0, 100% 100%, 0 100%)', opacity: 0.6 }} />
      </div>
    </>
  );
}
