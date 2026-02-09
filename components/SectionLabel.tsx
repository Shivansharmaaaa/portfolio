'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionLabelProps {
  number: string;
  text: string;
  centered?: boolean;
}

export default function SectionLabel({ number, text, centered = false }: SectionLabelProps) {
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const line = label.querySelector('.section-label-line');
    const textEl = label.querySelector('.section-label-text');

    if (line) {
      gsap.to(line, {
        width: 40,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: label, start: 'top 85%' },
      });
    }

    if (textEl) {
      gsap.to(textEl, {
        opacity: 1,
        duration: 0.4,
        delay: 0.2,
        scrollTrigger: { trigger: label, start: 'top 85%' },
      });
    }
  }, []);

  return (
    <div
      className="section-label"
      ref={labelRef}
      style={centered ? { justifyContent: 'center' } : undefined}
    >
      <div className="section-label-line"></div>
      <span className="section-label-text">
        {number} / {text}
      </span>
      {centered && <div className="section-label-line"></div>}
    </div>
  );
}
