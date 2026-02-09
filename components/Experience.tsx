'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading clip-path
    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.to(heading, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: heading, start: 'top 80%' },
      });
    }

    // Experience items slide in
    section.querySelectorAll('.exp-item').forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%' },
      });
    });
  }, []);

  return (
    <section className="section exp-section" id="experience" ref={sectionRef}>
      <SectionLabel number="02" text="Experience" />
      <h2 className="section-heading">
        Where I&apos;ve <span className="serif">worked</span>
      </h2>
      <div className="exp-list">
        <div className="exp-item">
          <div className="exp-date">
            Jun 2025 — Present
            <div className="status">
              <span className="status-dot"></span> Active
            </div>
          </div>
          <div>
            <div className="exp-role">Software Developer</div>
            <div className="exp-company">VI Security — Canada</div>
            <div className="exp-desc">
              <li>Building Flutter-based applications for student and employee login, training and certification, job postings, and content delivery</li>
              <li>Architecting end-to-end mobile solutions for security-focused platforms</li>
            </div>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-date">Apr 2025 — Aug 2025</div>
          <div>
            <div className="exp-role">Software Developer</div>
            <div className="exp-company">One on One Healthcare — Canada</div>
            <div className="exp-desc">
              <li>Connected and configured GitHub, Vercel, and GoDaddy to streamline deployment workflows</li>
              <li>Managed urgent technical requests during late hours due to international operations</li>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
