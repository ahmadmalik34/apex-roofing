"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 1500,
    suffix: "+",
    label: "Project Completed",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    value: 900,
    suffix: "+",
    label: "Happy Clients",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    value: 15,
    suffix: "yrs",
    label: "of Excellence",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
  },
];

function useCountUp(target: number, duration = 1400, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCountUp(stat.value, 1400, started);
  return (
    <div className="stat">
      <span className="stat-icon">{stat.icon}</span>
      <strong>{count}{stat.suffix}</strong>
      <span>{stat.label}</span>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`stats section-pad stats-reveal${started ? " revealed" : ""}`} aria-label="Apex Roofing at a glance">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} started={started} />
      ))}
    </section>
  );
}
