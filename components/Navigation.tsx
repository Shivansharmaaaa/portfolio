'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      start: 80,
      onUpdate: (self) => {
        if (navRef.current) {
          if (self.scroll() > 80) {
            navRef.current.classList.add('scrolled');
          } else {
            navRef.current.classList.remove('scrolled');
          }
        }
      },
    });
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="nav" ref={navRef} id="nav">
        <div className="nav-logo">SHIVANSH</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="nav-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#experience" onClick={handleNavClick}>Experience</a>
        <a href="#projects" onClick={handleNavClick}>Projects</a>
        <a href="#skills" onClick={handleNavClick}>Skills</a>
        <a href="#contact" onClick={handleNavClick}>Contact</a>
      </div>
    </>
  );
}
