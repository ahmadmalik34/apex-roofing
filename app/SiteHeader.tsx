"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current) return;
      const target = event.target as Node;
      if (!navRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    function handleHashChange() {
      setMenuOpen(false);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <header className="site-header" ref={navRef as React.RefObject<HTMLElement>}>
      <a href="#home" className="logo">
        <span className="logo-mark">
          {logoUrl ? (
            <Image src={logoUrl} alt={companyName} width={24} height={24} style={{ borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <HouseIcon />
          )}
        </span>
        <span>
          {companyName}
          <span className="orange">.</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map(([label, href], index) => (
          <a className={index === 0 ? "active" : ""} key={href} href={`#${href}`}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
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

        <a className="button button-orange header-button" href={`mailto:${contactEmail}`}>
          {contactLabel} <ArrowIcon />
        </a>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          {navLinks.map(([label, href]) => (
            <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
