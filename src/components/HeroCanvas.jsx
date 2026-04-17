import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles, LightStreak, DotGrid } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 193;
const ZOOM_FACTOR = 1;

export default function HeroCanvas() {
  const outerWrapperRef = useRef(null);
  const innerStickyRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const framesRef = useRef([]);

  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.fetchPriority = 'high';
      const frameNum = i.toString().padStart(4, '0');
      img.src = `/assets/deadlift-frames/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        loaded++;
        setLoadedPercent(Math.floor((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedPercent(Math.floor((loaded / TOTAL_FRAMES) * 100));
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    framesRef.current = images;
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawFrame = (index) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      ) * ZOOM_FACTOR;
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const scrollTrigger = ScrollTrigger.create({
      trigger: outerWrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: innerStickyRef.current,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        drawFrame(frameIndex);
      }
    });

    const beats = innerStickyRef.current.querySelectorAll('.story-beat');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerWrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    beats.forEach((beat, i) => {
      const start = i * 0.25;
      const fadeIn = 0.04;
      const hold = 0.16;
      const fadeOut = 0.04;
      const isRight = i === 2;
      const xFrom = isRight ? 30 : -30;

      tl.fromTo(beat,
        { opacity: 0, x: xFrom },
        { opacity: 1, x: 0, duration: fadeIn, ease: 'none' },
        start
      )
        .to(beat, { opacity: 1, x: 0, duration: hold }, start + fadeIn)
        .to(beat, { opacity: 0, x: isRight ? 30 : -30, duration: fadeOut, ease: 'none' }, start + fadeIn + hold);
    });

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(canvas, { x: -x, y: -y, scale: 1.05, duration: 0.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    drawFrame(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scrollTrigger.kill();
      tl.kill();
    };
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      gsap.to('.scroll-chevron', { y: 10, repeat: -1, yoyo: true, duration: 1, ease: 'power1.inOut' });
    }
  }, [isLoaded]);


  return (
    <div ref={outerWrapperRef} style={{ position: 'relative', height: '500vh' }}>
      {!isLoaded && (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#080808', color: 'var(--pure-white)', zIndex: 100 }}>
          <div className="bebas" style={{ fontSize: '64px', color: 'var(--primary-red)' }}>LOADING REVOLVE</div>
          <div style={{ fontSize: '14px', letterSpacing: '0.1em', marginTop: '10px' }}>{loadedPercent}% SYNCHRONIZED</div>
          {/* Thin progress bar */}
          <div style={{ width: '240px', height: '2px', background: 'rgba(255,255,255,0.1)', marginTop: '20px', borderRadius: '1px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${loadedPercent}%`, background: 'var(--primary-red)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      )}

      <div ref={innerStickyRef} style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#080808', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

        <LightStreak opacity={0.4} />

        {/* DotGrid — top-right corner per design2.txt */}
        <DotGrid
          rows={4} cols={5} color="#ffffff" size={4} gap={10}
          style={{ position: 'absolute', top: '80px', right: '40px', opacity: 0.15, zIndex: 5 }}
        />

        {/* Narrative Beats Overlays */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

          {/* BEAT 1 — DAY 1. Bottom-left anchored */}
          <div className="story-beat" style={{
            position: 'absolute',
            bottom: '18%',
            left: '6%',
            opacity: 0,
            maxWidth: '340px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
            }}>
              {/* Chapter marker */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}>
                <div style={{ width: '28px', height: '1px', background: '#E53535' }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  color: '#E53535',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                }}>
                  PHASE 01
                </span>
              </div>

              {/* Main headline */}
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(52px, 7vw, 88px)',
                color: '#ffffff',
                lineHeight: 0.9,
                letterSpacing: '0.04em',
                textShadow: '0 4px 40px rgba(0,0,0,0.9)',
              }}>
                DAY 1.
              </div>

              {/* Red underline */}
              <div style={{
                width: '48px',
                height: '3px',
                background: '#E53535',
                margin: '12px 0',
              }} />

              {/* Subtext */}
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.6,
              }}>
                Focus. Control.<br />Preparation.
              </div>
            </div>
          </div>

          {/* BEAT 2 — BREAKING POINT. Bottom-left, slightly higher */}
          <div className="story-beat" style={{
            position: 'absolute',
            bottom: '18%',
            left: '6%',
            opacity: 0,
            maxWidth: '420px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}>
                <div style={{ width: '28px', height: '1px', background: '#E53535' }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  color: '#E53535',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                }}>
                  PHASE 02
                </span>
              </div>

              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(52px, 7vw, 88px)',
                color: '#ffffff',
                lineHeight: 0.9,
                letterSpacing: '0.04em',
                textShadow: '0 4px 40px rgba(0,0,0,0.9)',
              }}>
                BREAKING<br />POINT.
              </div>

              <div style={{
                width: '48px',
                height: '3px',
                background: '#E53535',
                margin: '12px 0',
              }} />

              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.6,
              }}>
                This is where<br />most quit.
              </div>
            </div>
          </div>

          {/* BEAT 3 — CHAMPION. Right side for visual variety */}
          <div className="story-beat" style={{
            position: 'absolute',
            bottom: '18%',
            right: '5%',
            opacity: 0,
            maxWidth: '480px',
            textAlign: 'right',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
                flexDirection: 'row-reverse',
              }}>
                <div style={{ width: '28px', height: '1px', background: '#E53535' }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  color: '#E53535',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                }}>
                  PHASE 03
                </span>
              </div>

              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(48px, 5.5vw, 80px)',
                color: '#ffffff',
                lineHeight: 0.9,
                letterSpacing: '0.04em',
                textShadow: '0 4px 40px rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
              }}>
                CHAMPION.
              </div>

              <div style={{
                width: '48px',
                height: '3px',
                background: '#E53535',
                margin: '12px 0 12px auto',
              }} />

              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                lineHeight: 1.6,
              }}>
                Prove it.<br />Welcome home.
              </div>
            </div>
          </div>

          {/* BEAT 4 — IMPACT. Center, larger, explosive */}
          <div className="story-beat" style={{
            position: 'absolute',
            bottom: '18%',
            left: '5%',
            opacity: 0,
            maxWidth: '480px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}>
                <div style={{ width: '28px', height: '1px', background: '#E53535' }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  color: '#E53535',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                }}>
                  PHASE 04
                </span>
              </div>

              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(60px, 8vw, 100px)',
                color: '#E53535',
                lineHeight: 0.88,
                letterSpacing: '0.04em',
                textShadow: '0 0 60px rgba(229,53,53,0.4), 0 4px 40px rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
              }}>
                IMPACT.
              </div>

              <div style={{
                width: '64px',
                height: '3px',
                background: '#E53535',
                margin: '14px 0',
              }} />

              {/* JOIN NOW CTA — appears on final beat */}
              <a href="#join" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                color: '#ffffff',
                background: '#E53535',
                padding: '14px 32px',
                textDecoration: 'none',
                letterSpacing: '0.12em',
                borderRadius: '2px',
                width: 'fit-content',
                pointerEvents: 'auto',
                boxShadow: '0 0 40px rgba(229,53,53,0.35)',
              }}>
                JOIN REVOLVE →
              </a>
            </div>
          </div>

        </div>

        <Particles count={20} clusterPosition="bottom" />

        {isLoaded && (
          <div style={{ position: 'absolute', bottom: '5%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', pointerEvents: 'none' }}>
            <div style={{ width: '1px', height: '60px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}></div>
            <svg className="scroll-chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '8px', color: 'rgba(255,255,255,0.6)' }}><path d="M6 9l6 6 6-6" /></svg>
          </div>
        )}
      </div>
    </div>
  );
}
