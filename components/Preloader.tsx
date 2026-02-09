'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

// Pre-split so .char spans exist on first render — CSS hides them (translateY + opacity:0)
function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((c, i) =>
        c === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} className="char">
            {c}
          </span>
        )
      )}
    </>
  );
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nameEl = nameRef.current;
    if (!nameEl) return;

    const tl = gsap.timeline();

    // Chars already split in JSX — animate directly
    tl.to(nameEl.querySelectorAll('.char'), {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power3.out',
    });

    // Counter + bar
    const count = { val: 0 };
    tl.to(
      count,
      {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(Math.round(count.val));
          if (barRef.current) barRef.current.style.width = count.val + '%';
        },
      },
      '-=0.2'
    );

    // Wipe out
    tl.to(preloaderRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete: () => {
        if (preloaderRef.current) preloaderRef.current.style.display = 'none';
        onComplete();
      },
    });
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-name" ref={nameRef}>
        <SplitChars text="SHIVANSH SHARMA" />
      </div>
      <div className="preloader-counter" ref={counterRef}>
        0
      </div>
      <div className="preloader-bar-track">
        <div className="preloader-bar" ref={barRef}></div>
      </div>
    </div>
  );
}
