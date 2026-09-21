"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const reviews = [
  { initials: "M", name: "Mr. Taisman David", location: "Texas, USA", date: "July 26, 2026", text: "Apex replaced our whole roof after severe storm damage and took care of all insurance paperwork. Their team was punctual, respectful, and kept the site spotless daily. Months later, everything remains solid.", light: false },
  { initials: "S", name: "Mrs. Sandra Lee", location: "Florida, USA", date: "June 14, 2026", text: "Apex took care of our roof and even managed all the inspections. They showed up right on schedule and left the property spotless.", light: true },
  { initials: "R", name: "Mr. Robert Kim", location: "California, USA", date: "May 3, 2026", text: "From the first call to the final walkthrough, Apex was professional through and through. They replaced our aging shingles with quality materials and the result looks incredible.", light: false },
  { initials: "J", name: "Ms. Julia Hartman", location: "Georgia, USA", date: "April 19, 2026", text: "I had three companies quote the job. Apex was clear, honest, and fairly priced. No hidden fees, no pressure. The crew finished ahead of schedule and cleaned up perfectly.", light: true },
  { initials: "D", name: "Mr. Daniel Torres", location: "Arizona, USA", date: "March 8, 2026", text: "After a heavy hailstorm, my roof was a mess. Apex came out within 48 hours, assessed everything, and had the full replacement done in two days. Absolutely exceptional service.", light: false },
  { initials: "A", name: "Ms. Angela Brooks", location: "Tennessee, USA", date: "February 22, 2026", text: "The team handled a complex commercial roof for us without any disruption to our business. They worked around our hours and kept communication clear the whole time.", light: true },
  { initials: "C", name: "Mr. Carlos Mendez", location: "Nevada, USA", date: "January 31, 2026", text: "Apex repaired a persistent leak that two other contractors couldn't fix. They found the real source of the problem and resolved it properly. Haven't had an issue since.", light: false },
  { initials: "L", name: "Mrs. Laura Nguyen", location: "Washington, USA", date: "December 10, 2025", text: "I appreciated how straightforward the whole process was. They explained every step, gave us a fair estimate, and delivered exactly what was promised. Great craftsmanship.", light: true },
  { initials: "P", name: "Mr. Peter Walsh", location: "Colorado, USA", date: "November 5, 2025", text: "Apex installed a new metal roof on our mountain cabin. They handled the difficult slope and weather conditions expertly. The roof looks great and has already survived one brutal winter.", light: false },
  { initials: "N", name: "Ms. Nicole Adams", location: "Ohio, USA", date: "October 17, 2025", text: "Very impressed with the professionalism and quality of work. The crew was respectful, tidy, and efficient. I'll be recommending Apex to everyone in my neighborhood.", light: true },
  { initials: "B", name: "Mr. Brian Foster", location: "Michigan, USA", date: "September 29, 2025", text: "We had a full roof replacement on a tight deadline before selling our home. Apex delivered on time and the new roof actually helped us get a better offer. Worth every penny.", light: false },
  { initials: "K", name: "Mrs. Karen Mitchell", location: "Illinois, USA", date: "August 14, 2025", text: "The attention to detail was remarkable. They spotted some rotten decking we didn't even know about and fixed it as part of the job. Honest, thorough, and highly skilled.", light: true },
  { initials: "T", name: "Mr. Thomas Gray", location: "Virginia, USA", date: "July 2, 2025", text: "Apex handled our HOA-approved reroof smoothly, coordinating with the association on our behalf. Everything was documented properly and the result passed inspection first time.", light: false },
  { initials: "E", name: "Ms. Emily Russo", location: "New York, USA", date: "June 20, 2025", text: "I was nervous about the cost of a full replacement but Apex broke everything down transparently. No surprises on the bill, and the quality exceeded what I expected at that price.", light: true },
  { initials: "G", name: "Mr. George Patel", location: "Texas, USA", date: "May 11, 2025", text: "Second time using Apex — first for repairs, now a full replacement on our second property. Consistent quality both times. They've earned a customer for life.", light: false },
];

const VISIBLE = 2; // cards visible at once

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Measure one card width (including gap) to calculate scroll offset
  useEffect(() => {
    function measure() {
      if (!cardRef.current) return;
      const gap = 10;
      setCardWidth(cardRef.current.offsetWidth + gap);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const max = reviews.length - VISIBLE;

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(max, i + 1)), [max]);

  // Scroll the track when index changes
  useEffect(() => {
    if (!trackRef.current || !cardWidth) return;
    trackRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, [index, cardWidth]);

  return (
    <section id="review" className="reviews section-pad">
      <div className="section-heading inline-heading">
        <h2>Real Stories</h2>
        <div className="carousel-arrows">
          <button onClick={prev} aria-label="Previous review" disabled={index === 0}>‹</button>
          <button onClick={next} aria-label="Next review" disabled={index >= max}>›</button>
        </div>
      </div>

      <div className="review-track" ref={trackRef}>
        {reviews.map((r, i) => (
          <article className="review-card" key={i} ref={i === 0 ? cardRef : undefined}>
            <p>{r.text}</p>
            <div className="review-meta">
              <span className={`avatar${r.light ? " avatar-light" : ""}`}>{r.initials}</span>
              <span>
                <strong>{r.name}</strong>
                <small>{r.location}</small>
              </span>
              {r.date && <time>{r.date}</time>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
