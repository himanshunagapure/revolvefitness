import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { LightSweep, DotGrid, ChevronStack } from './Decorations';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What are your membership plans and pricing?",
    answer: "We offer various plans tailored to your fitness goals. Check out our diverse membership options and finding the perfect fit for you in our pricing section.",
    link: "#pricing",
    linkText: "View Pricing Plans"
  },
  {
    question: "Do you have personal trainers? Is it included or extra?",
    answer: "Yes, we have certified personal trainers ready to guide you. Personal training services are available for an extra charge to ensure you get dedicated, one-on-one attention."
  },
  {
    question: "What are your gym timings?",
    answer: "We are open in two main shifts to accommodate your schedule: Morning (6:00 AM - 10:00 AM) and Evening (5:00 PM - 10:00 PM)."
  },
  {
    question: "I’m a beginner. Will someone guide me?",
    answer: "Absolutely! Our professional trainers are always on the floor to help beginners with equipment usage and proper form."
  },
  {
    question: "What equipment and facilities do you have?",
    answer: "Our facility is equipped with state-of-the-art cardio machines, free weights, functional training areas, and dedicated spaces for various fitness activities."
  },
  {
    question: "Is the gym crowded? What are peak hours?",
    answer: "To help you plan your workout, our peak hours are typically 7:00 AM - 8:00 AM and 7:00 PM - 8:00 PM."
  },
  {
    question: "Do you provide diet guidance or personalized workout plans?",
    answer: "Yes, we provide comprehensive diet guidance, weight loss/muscle gain support, and personalized workout plans specifically for members enrolled in our Personal Training programs."
  },
  {
    question: "Are there separate sections or timings for women?",
    answer: "Revolve Fitness is a mixed-gender facility, promoting a diverse and inclusive environment for all fitness enthusiasts."
  },
  {
    question: "Is parking available?",
    answer: "Dedicated parking is available for two-wheelers. While we don't have on-site car parking, there is ample space available around the gym perimeter for cars."
  }
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.4,
        ease: 'power2.out',
        opacity: 1
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.3,
        ease: 'power2.in',
        opacity: 0
      });
    }
  }, [isOpen]);

  return (
    <div 
      className="faq-item" 
      style={{ 
        borderBottom: '1px solid var(--divider-gray)', 
        overflow: 'hidden',
        backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
        transition: 'background-color 0.3s ease'
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          color: isOpen ? 'var(--primary-red)' : 'var(--pure-white)',
          transition: 'color 0.3s ease'
        }}
      >
        <span className="bebas" style={{ fontSize: '20px', letterSpacing: '0.05em' }}>
          {faq.question}
        </span>
        <div style={{ 
          backgroundColor: isOpen ? 'var(--primary-red)' : 'transparent',
          border: isOpen ? 'none' : '1px solid #333',
          borderRadius: '50%',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          {isOpen ? <Minus size={18} color="white" /> : <Plus size={18} color="#666" />}
        </div>
      </button>
      
      <div 
        ref={contentRef} 
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div style={{ padding: '0 0 24px 0', color: 'var(--muted-text)', fontSize: '15px', lineHeight: '1.6', maxWidth: '800px' }}>
          {faq.answer}
          {faq.link && (
            <div style={{ marginTop: '16px' }}>
              <a 
                href={faq.link} 
                className="btn-primary" 
                style={{ 
                  display: 'inline-block', 
                  fontSize: '12px', 
                  padding: '8px 16px',
                  borderRadius: '2px'
                }}
              >
                {faq.linkText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.faq-header', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="faq" 
      style={{ 
        backgroundColor: 'var(--deep-black)', 
        padding: '120px 0', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      <LightSweep />
      
      <DotGrid
        rows={6} cols={6} color="#E53535" size={3} gap={12}
        style={{ position: 'absolute', top: '100px', right: '5%', opacity: 0.15, zIndex: 1 }}
      />

      <ChevronStack
        direction="up"
        color="#E53535"
        size={20}
        style={{ position: 'absolute', bottom: '60px', left: '5%', opacity: 0.2, zIndex: 1 }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="faq-header" style={{ marginBottom: '60px' }}>
          <div className="section-label" style={{ marginBottom: '16px' }}>SUPPORT CENTER</div>
          <h2 className="bebas" style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.9, color: 'white' }}>
            FREQUENTLY <span style={{ color: 'var(--primary-red)' }}>ASKED</span> QUESTIONS
          </h2>
          <p style={{ color: 'var(--muted-text)', marginTop: '20px', maxWidth: '500px' }}>
            Everything you need to know about joining the pack. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--divider-gray)' }}>
          {FAQS.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
