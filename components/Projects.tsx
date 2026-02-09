'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    category: 'UI / Frontend',
    name: 'Restaurant UI — Design 1',
    desc: 'A beautifully crafted frontend UI concept for a restaurant website, with modern design and engaging interactions.',
    stack: ['HTML/CSS', 'JavaScript', 'Vercel'],
    link: 'https://design-1-nine.vercel.app/',
  },
  {
    number: '02',
    category: 'UI / Frontend',
    name: 'Restaurant UI — Design 2',
    desc: 'A second iteration exploring different layout patterns and interaction paradigms for restaurant branding.',
    stack: ['HTML/CSS', 'JavaScript', 'Vercel'],
    link: 'https://design-2-zeta.vercel.app/',
  },
  {
    number: '03',
    category: 'AI / Automation',
    name: 'US Visa Appointment Bot',
    desc: 'An intelligent bot that monitors available US visa appointment dates and assists with scheduling — automation over manual effort.',
    stack: ['Python', 'Automation', 'Scraping'],
  },
  {
    number: '04',
    category: 'Machine Learning',
    name: 'Stock Predictor Model',
    desc: 'An ML model analyzing historical market data to predict stock movements — financial intuition meets data science.',
    stack: ['Python', 'ML', 'Data Science'],
  },
];

const singleProject = {
  number: '05',
  category: 'Deep Learning',
  name: 'Custom LLM',
  desc: "Built a large language model from scratch following Andrej Karpathy's tutorials — transformers, attention mechanisms, and neural network architecture from the ground up.",
  stack: ['Python', 'PyTorch', 'Transformers'],
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    // Project cards
    section.querySelectorAll('.project-card').forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      });
    });
  }, []);

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <SectionLabel number="03" text="Projects" />
      <h2 className="section-heading">
        Featured <span className="serif">work</span>
      </h2>
      <div className="projects-wrap">
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p.number} className="project-card">
              <div className="project-card-inner">
                <div className="project-number">{p.number}</div>
                <div className="project-category">{p.category}</div>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="stack-tag">{s}</span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Live <ArrowIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="project-single">
          <div className="project-card">
            <div className="project-card-inner">
              <div className="project-number">{singleProject.number}</div>
              <div className="project-category">{singleProject.category}</div>
              <h3 className="project-name">{singleProject.name}</h3>
              <p className="project-desc">{singleProject.desc}</p>
              <div className="project-stack">
                {singleProject.stack.map((s) => (
                  <span key={s} className="stack-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
