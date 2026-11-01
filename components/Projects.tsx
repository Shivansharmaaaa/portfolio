'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  number: string;
  category: string;
  name: string;
  desc: string;
  stack: string[];
  link?: string;
  github?: string;
  badge?: string;
};

const projects: Project[] = [
  {
    number: '01',
    category: 'AI / Blockchain',
    name: 'Proof of Repair',
    desc: 'Repair shops seal each repair to a phone (IMEI), car (VIN) or appliance, and buyers verify the history is unedited. A LoRA fine-tuned Mistral-7B writes reports grounded on 4,666 repair manuals (98.3% fault-code accuracy), and records are Merkle-batched and anchored on Ethereum and Bitcoin.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Solidity', 'Mistral-7B', 'LoRA'],
    github: 'https://github.com/Shivansharmaaaa/proof_of_repair',
    badge: 'Research paper in progress',
  },
  {
    number: '02',
    category: 'AI / NoSQL',
    name: 'GraphRAG Threat Intelligence',
    desc: 'Team project: GraphRAG over Neo4j, MongoDB, Qdrant and Redis, loaded with MITRE ATT&CK and live threat feeds. Every answer cites its evidence across all four stores and can be replayed to re-verify it; IOC lookups run at 1.8 ms median.',
    stack: ['Python', 'FastAPI', 'React', 'Neo4j', 'MongoDB', 'Redis', 'Qdrant'],
    github: 'https://github.com/Shivansharmaaaa/graphrag',
  },
  {
    number: '03',
    category: 'Voice AI',
    name: 'Voice Agent — AI Receptionist',
    desc: 'Answers calls for local businesses, qualifies the caller, books the job and escalates to a human, all running on a laptop. The browser decides when the caller stops and Parakeet decides what they said (51 ms, 0% WER); an instant opener cuts time-to-first-word from 3.5 s to under 20 ms. A LoRA fine-tuned Llama 3.2 3B passes 41/42 call checks.',
    stack: ['Next.js', 'TypeScript', 'Parakeet', 'Kokoro TTS', 'Llama 3.2', 'Twilio'],
    github: 'https://github.com/Shivansharmaaaa/voice-agent',
  },
  {
    number: '04',
    category: 'Voice AI / SaaS',
    name: 'NVIDIA Voice Agent SaaS',
    desc: 'Multi-tenant platform where businesses build AI phone agents in a 5-step wizard and deploy them to a Twilio number. Call audio streams through NVIDIA Nemotron ASR, Nemotron LLM and Magpie TTS, with circuit breakers and a GPU pool that prioritises live calls.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'FastAPI', 'Twilio'],
    github: 'https://github.com/Shivansharmaaaa/nvidia-voice-agent-saas',
  },
  {
    number: '05',
    category: '3D / Creative',
    name: '3D Drive-Through Portfolio',
    desc: 'A portfolio you drive through: a stylised city seen from the driver’s seat, with clickable project billboards, sunset, real-time and cyberpunk skies, speed controls and a low-graphics mode.',
    stack: ['React', 'Three.js', 'React Three Fiber', 'Vite'],
    link: 'https://shivansh-3d-portfolio.vercel.app',
    github: 'https://github.com/Shivansharmaaaa/3d-portfolio',
  },
  {
    number: '06',
    category: 'Quant Finance',
    name: 'Forex Grid Hedging System',
    desc: 'Grid strategy that hedges at 20-pip support/resistance levels. An 8-variant optimiser showed the 2x martingale blew up in 10 of 24 pair-years; the flat-lot redesign survived all 24 with a 68% win rate and Sharpe 2.2. Ported to Pine Script and an MT5 live bot.',
    stack: ['Python', 'Pandas', 'Pine Script', 'MetaTrader 5'],
    github: 'https://github.com/Shivansharmaaaa/forex-zone-trading-algo',
  },
  {
    number: '07',
    category: 'Machine Learning',
    name: 'Stock Price Prediction (LSTM)',
    desc: 'Stacked two-layer LSTM that forecasts the next-day close from the previous 60 trading days, compared against a linear-regression baseline, with a rolling-volatility band that shows a likely price range instead of a single number.',
    stack: ['Python', 'TensorFlow', 'scikit-learn', 'yfinance'],
    github: 'https://github.com/Shivansharmaaaa/stock',
  },
  {
    number: '08',
    category: 'Deep Learning',
    name: 'Custom LLM',
    desc: "Built a GPT-style language model from scratch following Andrej Karpathy's series: tokenizer, attention, transformer blocks and the training loop.",
    stack: ['Python', 'Transformers', 'Jupyter'],
    github: 'https://github.com/Shivansharmaaaa/LLM',
  },
  {
    number: '09',
    category: 'UI / Frontend',
    name: 'Restaurant UI — Design 1',
    desc: 'A beautifully crafted frontend UI concept for a restaurant website, with modern design and engaging interactions.',
    stack: ['HTML/CSS', 'JavaScript', 'Vercel'],
    link: 'https://design-1-nine.vercel.app/',
    github: 'https://github.com/Shivansharmaaaa/Design-1',
  },
  {
    number: '10',
    category: 'UI / Frontend',
    name: 'Restaurant UI — Design 2',
    desc: 'A second iteration exploring different layout patterns and interaction paradigms for restaurant branding.',
    stack: ['HTML/CSS', 'JavaScript', 'Vercel'],
    link: 'https://design-2-zeta.vercel.app/',
    github: 'https://github.com/Shivansharmaaaa/Design-2',
  },
];

const singleProject: Project = {
  number: '11',
  category: 'AI / Automation',
  name: 'Visa Appointment Bot',
  desc: 'A Telegram bot that lets non-technical staff run the whole visa appointment booking workflow through chat commands, with no separate app to build or maintain.',
  stack: ['JavaScript', 'Telegram API', 'Automation'],
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="project-card">
      <div className="project-card-inner">
        <div className="project-number">{p.number}</div>
        <div className="project-category">{p.category}</div>
        <h3 className="project-name">{p.name}</h3>
        {p.badge && <div className="project-badge">{p.badge}</div>}
        <p className="project-desc">{p.desc}</p>
        <div className="project-stack">
          {p.stack.map((s) => (
            <span key={s} className="stack-tag">{s}</span>
          ))}
        </div>
        {(p.link || p.github) && (
          <div className="project-links">
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View Live <ArrowIcon />
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                GitHub <ArrowIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
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
            <ProjectCard key={p.number} p={p} />
          ))}
        </div>
        <div className="project-single">
          <ProjectCard p={singleProject} />
        </div>
      </div>
    </section>
  );
}
