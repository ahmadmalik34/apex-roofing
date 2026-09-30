"use client";

import Image from "next/image";
import { useState } from "react";
import { useSiteConfig } from "./SiteConfigProvider";

const navLinks = [
  ["Home", "home"],
  ["Service", "service"],
  ["Work", "work"],
  ["Review", "review"],
  ["About", "about"],
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function HouseIcon() {
  return <span aria-hidden="true" className="icon-house">⌂</span>;
}

export default function SiteHeader() {
  const { companyName, logoUrl, contactLabel, contactEmail } = useSiteConfig();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a href="#home" className="logo">
        <span className="logo-mark">
          {logoUrl ? (
            <Image src={logoUrl} alt={companyName} width={24} height={24} style={{ borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <HouseIcon />
          )}
        </span>
        <span>{companyName}<span className="orange">.</span></span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map(([label, href], index) => (
          <a className={index === 0 ? "active" : ""} key={href} href={`#${href}`}>
            {label}
          </a>
        ))}
      </nav>

      <button
        className="mobile-menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" className="menu-icon"><span /><span /></span>
        <span>Menu</span>
      </button>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navLinks.map(([label, href]) => (
            <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}

      <a className="button button-orange header-button" href={`mailto:${contactEmail}`}>
        {contactLabel} <ArrowIcon />
      </a>
    </header>
  );
}
