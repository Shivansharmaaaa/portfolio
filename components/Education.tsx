'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const block = blockRef.current;
    if (!section || !block) return;

    // Heading
    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.to(heading, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: heading, start: 'top 80%' },
      });
    }

    // Education block
    gsap.to(block, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        onEnter: () => block.classList.add('revealed'),
      },
    });
  }, []);

  return (
    <section className="section" id="education" ref={sectionRef}>
      <SectionLabel number="05" text="Education" />
      <h2 className="section-heading">Education</h2>
      <div className="edu-block" ref={blockRef}>
        <div className="edu-degree">B.Tech Computer Science and Engineering (Core)</div>
        <div className="edu-school">Vellore Institute of Technology, Vellore</div>
        <div className="edu-year">Expected Graduation — 2027</div>
      </div>
    </section>
  );
}
