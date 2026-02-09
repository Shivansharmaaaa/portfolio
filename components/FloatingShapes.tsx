'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = containerRef.current.querySelectorAll('.floating-shape');

    shapes.forEach((shape, i) => {
      // Parallax movement on scroll
      gsap.to(shape, {
        y: () => (i % 2 === 0 ? -150 : 150),
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1 + i * 0.5,
        },
      });
    });

    // Mouse parallax for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const depth = (i + 1) * 8;
        gsap.to(shape, {
          rotateX: y * depth,
          rotateY: x * depth,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {/* Top-right cube */}
      <div className="floating-3d" style={{ top: '15%', right: '8%', perspective: '1000px' }}>
        <div
          className="floating-shape"
          style={{
            width: '50px',
            height: '50px',
            border: '1px solid rgba(210,255,0,0.08)',
            animationDelay: '0s',
          }}
        />
      </div>

      {/* Mid-left diamond */}
      <div className="floating-3d" style={{ top: '45%', left: '5%', perspective: '800px' }}>
        <div
          className="floating-shape"
          style={{
            width: '35px',
            height: '35px',
            border: '1px solid rgba(210,255,0,0.06)',
            transform: 'rotate(45deg)',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Bottom-right triangle */}
      <div className="floating-3d" style={{ bottom: '20%', right: '12%', perspective: '1200px' }}>
        <div
          className="floating-shape"
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            borderLeft: '1px solid rgba(210,255,0,0.07)',
            borderBottom: '1px solid rgba(210,255,0,0.07)',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Center-left circle */}
      <div className="floating-3d" style={{ top: '70%', left: '15%', perspective: '900px' }}>
        <div
          className="floating-shape"
          style={{
            width: '25px',
            height: '25px',
            border: '1px solid rgba(210,255,0,0.05)',
            borderRadius: '50%',
            animationDelay: '1s',
          }}
        />
      </div>
    </div>
  );
}
