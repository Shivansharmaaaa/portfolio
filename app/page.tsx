'use client';

import { useState, useCallback } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SpeedStrip from '@/components/SpeedStrip';
import About from '@/components/About';
import Experience from '@/components/Experience';
import HorizontalScroll from '@/components/HorizontalScroll';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Vision from '@/components/Vision';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingShapes from '@/components/FloatingShapes';
import NoiseOverlay from '@/components/NoiseOverlay';

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <SmoothScroll>
      <Preloader onComplete={handlePreloaderComplete} />
      <Navigation />
      <FloatingShapes />
      <NoiseOverlay />

      <main>
        <Hero isReady={heroReady} />
        <SpeedStrip />
        <About />
        <Experience />
        <HorizontalScroll />
        <Projects />
        <Skills />
        <Education />
        <Vision />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
