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
          <div className="exp-date">Jan 2026 — Jun 2026</div>
          <div>
            <div className="exp-role">Software Developer</div>
            <div className="exp-company">VI Official — Canada (Hybrid)</div>
            <div className="exp-desc">
              <li>Built a full-stack job posting and discovery app connecting employers with security and healthcare staff</li>
              <li>Built a clock-in/out module giving employers live staff location and shift times; the app has 1,000+ active users</li>
              <li>Built a Telegram bot that lets an immigration client&apos;s non-technical staff run visa appointment booking by chat</li>
            </div>
          </div>
        </div>
        <div className="exp-item">
          <div className="exp-date">May 2025 — Jun 2025</div>
          <div>
            <div className="exp-role">Web Developer</div>
            <div className="exp-company">One on One Healthcare — Canada (Remote)</div>
            <div className="exp-desc">
              <li>Redesigned the company website end-to-end, improving layout, content structure and usability</li>
              <li>Migrated the site to Vercel and handed over a streamlined setup the team now updates independently</li>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
