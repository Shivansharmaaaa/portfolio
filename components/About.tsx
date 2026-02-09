'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section heading clip-path reveal
    const heading = section.querySelector('.section-heading');
    if (heading) {
      gsap.to(heading, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: heading, start: 'top 80%' },
      });
    }

    // About text paragraphs
    section.querySelectorAll('.about-text p').forEach((p, i) => {
      gsap.to(p, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: p, start: 'top 85%' },
      });
    });

    // About metrics
    if (metricsRef.current) {
      gsap.to(metricsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: metricsRef.current, start: 'top 80%' },
      });
    }

    // Counter animation
    section.querySelectorAll('.metric-value[data-count]').forEach((el) => {
      const target = parseInt((el as HTMLElement).dataset.count || '0');
      const suffix = (el as HTMLElement).dataset.suffix || '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
            },
          });
        },
        once: true,
      });
    });
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <SectionLabel number="01" text="About" />
      <h2 className="section-heading">
        Code. <span className="serif">Create.</span>
        <br />
        Ship.
      </h2>
      <div className="about-layout">
        <div className="about-text">
          <p>
            I&apos;m a <strong>Computer Science student at VIT Vellore</strong> with a drive for
            building polished digital products. From shipping Flutter apps for Canadian startups
            to training ML models and designing restaurant UIs — I work across the full stack.
          </p>
          <p>
            My philosophy: <strong>move fast, build clean, obsess over UX</strong>. Whether it&apos;s
            configuring deployment pipelines at 2 AM for international teams or diving deep into
            transformer architectures, I bring relentless intensity.
          </p>
        </div>
        <div className="about-metrics" ref={metricsRef}>
          <div className="metric">
            <div className="metric-value" data-count="2" data-suffix="+">0</div>
            <div className="metric-label">Companies</div>
          </div>
          <div className="metric">
            <div className="metric-value" data-count="5" data-suffix="+">0</div>
            <div className="metric-label">Projects</div>
          </div>
          <div className="metric">
            <div className="metric-value">&apos;27</div>
            <div className="metric-label">Graduation</div>
          </div>
          <div className="metric">
            <div className="metric-value">&infin;</div>
            <div className="metric-label">Curiosity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
