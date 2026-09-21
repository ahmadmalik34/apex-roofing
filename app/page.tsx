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
          <div className="hero-caption">Crafting quality.<br />Building trust.</div>
        </div>
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
            <h2>Safe Roof,<br />Safe Home</h2>
            <p>Request your free, clear estimate today. We give a simple, honest advice without any high pressure pitch.</p>
            <a className="button button-orange" href="mailto:hello@apexroofing.com">Get Your Free Estimate <ArrowIcon /></a>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <SiteFooter />
      </Reveal>
    </main>
  );
}
