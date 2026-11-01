'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const skillData = [
  {
    label: 'Languages',
    pills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Solidity'],
  },
  {
    label: 'Development',
    pills: ['Full-Stack Development', 'React', 'Next.js', 'Node.js', 'NestJS', 'FastAPI', 'Flutter', 'WebSockets'],
  },
  {
    label: 'Databases',
    pills: ['PostgreSQL', 'MongoDB', 'Neo4j', 'Redis', 'Qdrant'],
  },
  {
    label: 'DevOps & Tools',
    pills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'GitHub', 'CI/CD Pipelines'],
  },
  {
    label: 'AI & Machine Learning',
    pills: ['LLM Fine-Tuning (LoRA)', 'RAG / GraphRAG', 'LSTMs', 'Transformers', 'TensorFlow', 'scikit-learn'],
  },
  {
    label: 'Core CS',
    pills: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
  },
];

export default function Skills() {
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

    // Skill rows + pills stagger
    section.querySelectorAll('.skill-row').forEach((row) => {
      gsap.to(row, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 85%' },
      });
      const pills = row.querySelectorAll('.skill-pill');
      gsap.to(pills, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 80%' },
      });
    });
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={sectionRef}>
      <SectionLabel number="04" text="Skills" />
      <h2 className="section-heading">
        Tech <span className="serif">stack</span>
      </h2>
      <div className="skills-grid">
        {skillData.map((row) => (
          <div key={row.label} className="skill-row">
            <div className="skill-row-label">{row.label}</div>
            <div className="skill-pills">
              {row.pills.map((pill) => (
                <span key={pill} className="skill-pill">{pill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
