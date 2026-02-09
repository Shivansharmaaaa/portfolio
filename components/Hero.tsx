'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isReady: boolean;
}

// Pre-split a word into .char spans so CSS hides them immediately
function CharSplit({
  text,
  serif = false,
}: {
  text: string;
  serif?: boolean;
}) {
  return (
    <span className={`line${serif ? ' serif' : ''}`} style={{ overflow: 'hidden', display: 'block' }}>
      {text.split('').map((c, i) =>
        c === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className="char"
            style={
              serif
                ? {
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'var(--neon)',
                  }
                : undefined
            }
          >
            {c}
          </span>
        )
      )}
    </span>
  );
}

export default function Hero({ isReady }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Create speed lines
  useEffect(() => {
    const container = speedLinesRef.current;
    if (!container) return;
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      line.className = 'speed-line';
      line.style.top = Math.random() * 100 + '%';
      line.style.width = 100 + Math.random() * 200 + 'px';
      line.style.animationDelay = Math.random() * 3 + 's';
      line.style.animationDuration = 2 + Math.random() * 3 + 's';
      container.appendChild(line);
    }
  }, []);

  // Reveal hero after preloader
  useEffect(() => {
    if (!isReady || hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // Nav slide down
    tl.to('.nav', { y: 0, duration: 0.8, ease: 'power3.out' });

    // Hero glows
    tl.to('.hero-glow', { opacity: 0.08, duration: 1.5, ease: 'power2.out' }, '-=0.4');
    tl.to('.hero-glow-2', { opacity: 0.04, duration: 1.5, ease: 'power2.out' }, '-=1.2');
    tl.to('.hero-grid', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=1');

    // Speed lines
    tl.to('.speed-lines', { opacity: 1, duration: 0.8 }, '-=0.8');

    // Eyebrow
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6');

    // Hero name chars — already split in JSX
    tl.to(
      '#heroName .char',
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.025,
        ease: 'power3.out',
      },
      '-=0.3'
    );

    // Bottom section
    tl.to('.hero-bottom', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2');

    // Scroll indicator
    tl.to('.hero-scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

    // Setup parallax
    gsap.to('.hero-glow', {
      y: 200,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    gsap.to('.hero-glow-2', {
      y: 100,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    gsap.to('#heroName', {
      y: -80,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    gsap.to('.hero-content', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '60% top', end: 'bottom top', scrub: true },
    });

    gsap.to('.hero-scroll-indicator', {
      opacity: 0,
      y: 10,
      scrollTrigger: { trigger: '.hero', start: '10% top', end: '25% top', scrub: true },
    });
  }, [isReady]);

  return (
    <section className="hero" ref={heroRef} id="hero">
      <div className="hero-bg">
        <div className="hero-glow"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-grid"></div>
        <div className="speed-lines" ref={speedLinesRef}></div>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          <span className="hero-eyebrow-text">Software Developer</span>
        </div>
        <h1 className="hero-name" id="heroName" ref={nameRef}>
          <CharSplit text="Shivansh" />
          <CharSplit text="Sharma" serif />
        </h1>
        <div className="hero-bottom">
          <p className="hero-desc">
            Full-stack developer building Flutter apps, automating workflows,
            and pushing into ML &amp; fintech. Currently shipping software for
            companies across Canada.
          </p>
          <div className="hero-cta">
            <MagneticButton href="#projects" className="btn-neon">
              Projects
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost">
              Contact
            </MagneticButton>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-bar"></div>
      </div>
    </section>
  );
}
