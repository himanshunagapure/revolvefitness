import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';
import { LightSweep, ChevronStack, DotGrid } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  { name: "STARTER", price: { monthly: 9.99, annual: 7.99 }, features: ["Cardio Access", "Locker Room"], missing: ["Classes Included", "Personal Trainer"], featured: false },
  { name: "CHAMPION", price: { monthly: 19.99, annual: 15.99 }, features: ["All Classes", "Personal Trainer (2x/wk)", "Nutrition Plan"], missing: [], featured: true },
  { name: "ELITE", price: { monthly: 34.99, annual: 27.99 }, features: ["Everything in Champion", "Unlimited PT Sessions", "Recovery Suite Access"], missing: [], featured: false }
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const containerRef = useRef(null);
  const chevronRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.price-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
      );

      // Chevron scroll-enter animation
      if (chevronRef.current) {
        const chevronSvgs = chevronRef.current.querySelectorAll('svg');
        gsap.fromTo(chevronSvgs,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="pricing" style={{ backgroundColor: 'var(--deep-black)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <LightSweep />

      {/* DotGrid — top-right corner */}
      <DotGrid
        rows={4} cols={5} color="#E53535" size={4} gap={10}
        style={{ position: 'absolute', top: '40px', right: '40px', opacity: 0.2, zIndex: 1 }}
      />

      {/* ChevronStack — bottom-left, decorative */}
      <div ref={chevronRef}>
        <ChevronStack
          direction="right"
          color="#E53535"
          size={24}
          style={{ position: 'absolute', bottom: '40px', left: '40px', opacity: 0.3, zIndex: 1 }}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Two-tone heading */}
        <h2 className="bebas text-center" style={{ marginBottom: '20px', lineHeight: 0.95 }}>
          <span style={{ color: '#ffffff', display: 'block', fontSize: 'clamp(40px, 6vw, 72px)' }}>FIND YOUR</span>
          <span style={{ color: '#E53535', display: 'block', fontSize: 'clamp(40px, 6vw, 72px)', transform: 'skewX(-2deg)', transformOrigin: 'center' }}>PLAN</span>
        </h2>

        {/* Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '48px', fontSize: '14px', color: 'white' }}>
          <span>Monthly</span>
          <div style={{ width: '60px', height: '30px', backgroundColor: '#1a1a1a', borderRadius: '15px', position: 'relative', cursor: 'pointer', border: '1px solid #333', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)' }} onClick={() => setAnnual(!annual)}>
            <div style={{ width: '26px', height: '26px', backgroundColor: 'var(--primary-red)', borderRadius: '13px', position: 'absolute', top: '1px', left: annual ? '31px' : '1px', transition: 'left 0.4s cubic-bezier(0.25, 1, 0.5, 1)', boxShadow: '0 2px 8px rgba(229,53,53,0.5)' }}></div>
          </div>
          <span>Annual <span style={{ color: 'var(--primary-red)', fontSize: '12px', marginLeft: '5px' }}>Save 20%</span></span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div key={i} className="price-card" style={{ backgroundColor: 'var(--card-surface)', borderRadius: '8px', padding: '32px', border: plan.featured ? '1px solid var(--primary-red)' : '1px solid #222', transform: plan.featured ? 'scale(1.04)' : 'scale(1)', position: 'relative', zIndex: plan.featured ? 10 : 1, boxShadow: plan.featured ? '0 0 60px rgba(229,53,53,0.2), 0 0 120px rgba(229,53,53,0.08)' : 'none' }}>
              <div className="corner-tl"></div>
              {plan.featured && <div className="corner-tr"></div>}
              {plan.featured && <div className="corner-bl"></div>}
              <div className="corner-br"></div>
              {plan.featured && (
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary-red)', color: 'white', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px', letterSpacing: '0.05em' }}>MOST POPULAR</div>
              )}
              <h3 className="bebas" style={{ fontSize: '24px', color: 'white', marginBottom: '10px' }}>{plan.name}</h3>
              <div style={{ marginBottom: '24px' }}>
                <span className="bebas" style={{ fontSize: '56px', color: plan.featured ? 'var(--primary-red)' : 'white' }}>${annual ? plan.price.annual : plan.price.monthly}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>/month</span>
              </div>
              <ul style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.features.map((f, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#ccc' }}>
                    <Check size={16} color="var(--primary-red)" style={{ marginRight: '10px' }} /> {f}
                  </li>
                ))}
                {plan.missing.map((f, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#555' }}>
                    <X size={16} color="#444" style={{ marginRight: '10px' }} /> {f}
                  </li>
                ))}
              </ul>
              <button className={plan.featured ? "btn-primary" : "btn-outline"} style={{ width: '100%' }}>{plan.featured ? 'JOIN NOW' : 'GET STARTED'}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
