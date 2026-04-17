import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import StatsBar from './components/StatsBar';
import Classes from './components/Classes';
import Trainers from './components/Trainers';
import Manifesto from './components/Manifesto';
import Pricing from './components/Pricing';
import Transformations from './components/Transformations';
import Location from './components/Location';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    });

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroCanvas />
      <StatsBar />
      <Classes />
      <Trainers />
      <Manifesto />
      <Pricing />
      <Transformations />
      <Location />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
