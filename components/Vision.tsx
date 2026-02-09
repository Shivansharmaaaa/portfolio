'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

// Pre-split into .word spans so CSS hides them from frame 1
function WordReveal({ children }: { children: React.ReactNode }) {
  // We need to handle mixed text + JSX children (like <span className="highlight">)
  // So we render the children as-is but wrap plain text words in spans
  return <>{children}</>;
}

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Vision glow
    gsap.to(section.querySelector('.vision-glow'), {
      opacity: 0.05,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        scrub: 1,
      },
    });

    // Vision quote - word by word reveal
    const quoteEl = quoteRef.current;
    if (quoteEl) {
      // Words are pre-split in JSX as .word spans
      gsap.to(quoteEl.querySelectorAll('.word'), {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: { trigger: quoteEl, start: 'top 75%' },
      });
    }

    gsap.to(section.querySelector('.vision-sub'), {
      opacity: 1,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: section.querySelector('.vision-sub'), start: 'top 85%' },
    });
  }, []);

  return (
    <section className="vision-section" id="vision" ref={sectionRef}>
      <div className="vision-glow"></div>
      <div className="vision-content">
        <SectionLabel number="06" text="Vision" centered />
        <h2 className="vision-quote" ref={quoteRef}>
          <span className="word">Aspiring</span>{' '}
          <span className="word">to</span>{' '}
          <span className="word">reshape</span>{' '}
          <span className="highlight word">fintech</span>{' '}
          <span className="word">—</span>{' '}
          <span className="word">and</span>{' '}
          <span className="word">someday</span>{' '}
          <span className="word">build</span>{' '}
          <span className="word">a</span>{' '}
          <span className="word">hedge</span>{' '}
          <span className="word">fund</span>{' '}
          <span className="word">inspired</span>{' '}
          <span className="word">by</span>{' '}
          <span className="highlight word">Renaissance</span>{' '}
          <span className="highlight word">Technologies.</span>
        </h2>
        <p className="vision-sub">
          Where code meets capital markets, I see my future. Combining software engineering
          with quantitative finance to build systems that outthink the market.
        </p>
      </div>
    </section>
  );
}
