"use client";

import { useState } from "react";

const services: [string, string][] = [
  ["Residential Roofing", "Complete replacements and custom installations designed to withstand harsh local weather across all property types."],
  ["Commercial Roofing", "Durable, practical roofing systems built for the demands of your business."],
  ["Storm & Repair", "Fast, dependable repairs that keep small problems from becoming expensive ones."],
  ["Gutter & Drainage", "Thoughtful water management that protects your roof, walls, and foundation."],
  ["Inspections", "Clear, honest assessments before you make your next roofing decision."],
];

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="services-list">
      {services.map(([title, description], index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={title}
            className={`service-item${isOpen ? " service-open" : ""}`}
          >
            <button
              className="service-summary"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{title}</span>
              <span className="service-plus" aria-hidden="true">
                {isOpen ? "↗" : "+"}
              </span>
            </button>
            <div className="service-body" aria-hidden={!isOpen}>
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
