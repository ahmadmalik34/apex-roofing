"use client";

import { useSiteConfig } from "./SiteConfigProvider";

function HouseIcon() {
  return <span aria-hidden="true" className="icon-house">⌂</span>;
}

export default function SiteFooter() {
  const { companyName } = useSiteConfig();

  return (
    <footer id="about" className="footer section-pad">
      <div className="footer-top">
        <a href="#home" className="logo">
          <span className="logo-mark"><HouseIcon /></span>
          <span>{companyName}<span className="orange">.</span></span>
        </a>
        <div className="footer-column">
          <span>Mon-Fri : 7am - 7pm</span>
          <span>Saturday : 7am - 1pm</span>
          <span>Sunday : off</span>
        </div>
        <div className="footer-column">
          <a href="#home">Home</a>
          <a href="#service">Service</a>
          <a href="#work">Our works</a>
          <a href="#about">About us</a>
          <a href="#review">Testimonials</a>
          <a href="#book">CTA</a>
        </div>
        <div className="footer-column">
          <a href="#about">About us</a>
          <a href="#about">Contact us</a>
          <a href="#book">Career</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 All rights reserved.</span>
        <a href="#about">Privacy Policy</a>
        <a href="#about">Terms of Service</a>
        <a href="#about">Security</a>
        <a href="#about">Cookie</a>
      </div>
    </footer>
  );
}
