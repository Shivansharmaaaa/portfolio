'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  ['CODE', 'THAT', 'MOVES', 'FAST'],
  ['DESIGN', 'THAT', 'STANDS', 'OUT'],
  ['IDEAS', 'THAT', 'SHIP'],
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof window === 'undefined') return;
    if (window.innerWidth < 900) return;

    const panelEls = track.querySelectorAll('.hscroll-panel');
    const totalWidth = panelEls.length * window.innerWidth;

    const scrollTween = gsap.to(track, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + (totalWidth - window.innerWidth),
      },
    });

    // Activate words as they come into view
    panelEls.forEach((panel, pi) => {
      const words = panel.querySelectorAll('.word');
      words.forEach((word, wi) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => 'top top+=' + (pi * window.innerWidth + wi * 150),
          end: () => 'top top+=' + (pi * window.innerWidth + (wi + 1) * 150 + 200),
          onEnter: () => word.classList.add('active'),
          onLeaveBack: () => word.classList.remove('active'),
        });
      });
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <section className="hscroll-section" ref={sectionRef} id="hscroll">
      <div className="hscroll-track" ref={trackRef}>
        {panels.map((words, pi) => (
          <div key={pi} className="hscroll-panel">
            <div className="big-text-reveal">
              {words.map((word, wi) => (
                <span key={wi} className="word">
                  {word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
