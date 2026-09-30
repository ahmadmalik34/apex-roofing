import Image from "next/image";
import ServicesAccordion from "./ServicesAccordion";
import StatsSection from "./StatsSection";
import Reveal from "./Reveal";
import ReviewsCarousel from "./ReviewsCarousel";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

const work = [
  { src: "/images/our work 1.jpg", title: "Commercial roof", large: true },
  { src: "/images/our work 2.jpg", title: "Modern metal roof", large: true },
  { src: "/images/our work 3.jpg", title: "Clean lines", large: false },
  { src: "/images/our work 4.jpg", title: "Residential detail", large: false },
  { src: "/images/our work 5.jpg", title: "Built for home", large: false },
];

export default function Home() {
  return (
    <main>
      {/* Hero — no reveal, it's the first thing visible */}
      <section id="home" className="hero-wrap">
        <div className="hero">
          <Image src="/images/hero image.jpg" alt="Roofer working on a metal roof" fill className="hero-image" priority />
          <SiteHeader />
          <div className="hero-content">
            <p className="hero-eyebrow">Roofing you can count on</p>
            <h1>Crafting quality.<br />Building trust.</h1>
            <a className="button button-orange hero-button" href="#book">Get a free estimate <ArrowIcon /></a>
          </div>
          <div className="hero-caption">25 years of hands-on experience</div>
        </div>
      </section>

      <section className="proof-strip section-pad" aria-label="Why choose Apex Roofing">
        <div className="proof-item"><strong>25+</strong><span>years of experience</span></div>
        <div className="proof-item"><strong>1,500+</strong><span>roofs completed</span></div>
        <div className="proof-item"><strong>Free</strong><span>honest estimates</span></div>
      </section>

      <Reveal>
        <section className="intro section-pad">
          <div className="intro-row">
            <h1>We Build<br />Roofs That <span className="orange">Last.</span></h1>
            <p className="small-copy">Expert craftsmanship meets reliable modern care. Protecting local homes and businesses with strong roofing solutions built to last.</p>
          </div>
          <p className="statement"><strong>Apex Roofing delivers premium craftsmanship</strong><span>, quick repairs, and reliable full replacements using weather-resistant materials.</span></p>
        </section>
      </Reveal>

      <Reveal>
        <section id="service" className="services section-pad">
          <div className="section-heading"><div><h2>Our Services</h2><p className="small-copy">Every project benefits from our 25 years of hands-on experience and a dedicated team treating your home with care.</p></div><div className="heading-rule" /></div>
          <ServicesAccordion />
        </section>
      </Reveal>

      <StatsSection />

      <Reveal>
        <section id="work" className="work section-pad">
          <div className="section-heading inline-heading"><h2>Our Works</h2><a className="mini-button" href="#book">See all <ArrowIcon /></a></div>
          <div className="work-grid">{work.map((item) => <a className={`work-card ${item.large ? "large" : ""}`} href="#book" key={item.src}><Image src={item.src} alt={item.title} fill sizes="(max-width: 700px) 100vw, 50vw" /><span>{item.title}</span>{item.large && <small>Explore a recent project <ArrowIcon /></small>}</a>)}</div>
        </section>
      </Reveal>

      <Reveal>
        <ReviewsCarousel />
      </Reveal>

      <Reveal>
        <section id="book" className="cta">
          <Image src="/images/safe roof.jpg" alt="Safe modern home with a strong roof" fill sizes="100vw" />
          <div className="cta-content">
            <p className="cta-kicker">A stronger roof starts here</p>
            <h2>Safe Roof,<br />Safe Home</h2>
            <p>Get a clear plan for your home from a team that treats your property like its own. No pressure, no surprises.</p>
            <a className="button button-orange" href="mailto:hello@apexroofing.com">Start with a free estimate <ArrowIcon /></a>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <SiteFooter />
      </Reveal>
    </main>
  );
}
