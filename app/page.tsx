"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  number: string;
  name: string;
  edition: string;
  note: string;
  image: string;
  accent: string;
  accentSoft: string;
  accentAlt: string;
  copy: string;
};

const products: Product[] = [
  {
    id: "aurora",
    number: "01",
    name: "AURORA",
    edition: "IRIDESCENT EDITION",
    note: "Violet × Acid Green",
    image: "/products/vexa-aurora.webp",
    accent: "#b834ff",
    accentSoft: "rgba(184, 52, 255, .24)",
    accentAlt: "#58ff72",
    copy: "An iridescent violet-to-green shell creates the collection’s most expressive visual signature.",
  },
  {
    id: "noir",
    number: "02",
    name: "NOIR",
    edition: "BLACK RASPBERRY EDITION",
    note: "Midnight × Raspberry",
    image: "/products/vexa-noir.webp",
    accent: "#ff2b8f",
    accentSoft: "rgba(255, 43, 143, .24)",
    accentAlt: "#ff68b0",
    copy: "Deep black metal meets a raspberry glow — controlled, minimal and sharply defined.",
  },
  {
    id: "tide",
    number: "03",
    name: "TIDE",
    edition: "DEEP OCEAN EDITION",
    note: "Deep Teal × Silver",
    image: "/products/vexa-tide.webp",
    accent: "#10e4d6",
    accentSoft: "rgba(16, 228, 214, .2)",
    accentAlt: "#88fff7",
    copy: "A cool ocean tone and silver detailing create a clean, technical visual language.",
  },
  {
    id: "gold",
    number: "04",
    name: "GOLD",
    edition: "SIGNATURE EDITION",
    note: "Liquid Gold × Chrome",
    image: "/products/vexa-gold.webp",
    accent: "#ffb51b",
    accentSoft: "rgba(255, 181, 27, .22)",
    accentAlt: "#ffe079",
    copy: "The signature gold edition pairs minimal graphics with warm metal and a refined finish.",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const active = useMemo(() => products[activeIndex], [activeIndex]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalProduct ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modalProduct) setModalProduct(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalProduct]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty("--tilt-x", `${y * -7}deg`);
    heroRef.current.style.setProperty("--tilt-y", `${x * 9}deg`);
    heroRef.current.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    heroRef.current.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  const resetTilt = () => {
    heroRef.current?.style.setProperty("--tilt-x", "0deg");
    heroRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <main
      className="site-shell"
      style={
        {
          "--accent": active.accent,
          "--accent-soft": active.accentSoft,
          "--accent-alt": active.accentAlt,
        } as React.CSSProperties
      }
    >
      <div className="progress-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="VEXA — back to top">
          VE<span>X</span>A
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Editions</a>
          <a href="#system" onClick={() => setMenuOpen(false)}>Design system</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Case study</a>
        </nav>
        <div className="topbar-actions">
          <span className="adult-pill">CASE 01</span>
          <a className="outline-button desktop-only" href="#collection">Explore the system</a>
          <button
            className={menuOpen ? "menu-button is-open" : "menu-button"}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <section
        id="top"
        className="hero"
        ref={heroRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="signal-beam beam-one" aria-hidden="true" />
        <div className="signal-beam beam-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent brand concept · Warsaw</p>
          <h1>
            BRAND IN<br />
            <em>MOTION.</em>
          </h1>
          <p className="hero-lede">
            VEXA is a fictional packaging and identity study built around four
            distinct color worlds and one unmistakable visual code.
          </p>
          <div className="hero-actions">
            <a className="solid-button" href="#collection">
              Explore four editions <span>↘</span>
            </a>
            <a className="text-link" href="#system">See the system <span>→</span></a>
          </div>
          <div className="hero-metrics" aria-label="Project highlights">
            <div><strong>330</strong><span>ML / CAN</span></div>
            <div><strong>04</strong><span>EDITIONS</span></div>
            <div><strong>01</strong><span>DESIGN SYSTEM</span></div>
          </div>
        </div>

        <div className="hero-product-wrap">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="product-image-stage" key={active.id}>
            <Image
              src={active.image}
              alt={`VEXA ${active.name} can shown from the front and back`}
              fill
              priority
              unoptimized
              sizes="(max-width: 800px) 100vw, 60vw"
              className="hero-product-image"
            />
          </div>
          <div className="floating-spec spec-top">
            <span>EDITION</span><strong>{active.number} / 04</strong>
          </div>
          <div className="floating-spec spec-bottom">
            <span>COLOR SYSTEM</span><strong>{active.note}</strong>
          </div>
        </div>

        <div className="hero-edition-dock" role="tablist" aria-label="Select a VEXA edition">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "dock-item is-active" : "dock-item"}
              onClick={() => setActiveIndex(index)}
              style={{ "--dock-color": product.accent } as React.CSSProperties}
            >
              <span>{product.number}</span>
              <i />
              <small>{product.name}</small>
            </button>
          ))}
        </div>

        <div className="hero-side-label">VEXA® · FICTIONAL PACKAGING STUDY</div>
        <a href="#collection" className="scroll-cue" aria-label="Scroll to the editions">
          <span>SCROLL</span><i />
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>COLOR</span><i>✦</i><span>METAL</span><i>✦</i><span>FORM</span><i>✦</i>
          <span>VEXA ORIGINAL</span><i>✦</i><span>COLOR</span><i>✦</i><span>SIGNAL</span><i>✦</i>
          <span>ONE SYSTEM</span><i>✦</i><span>VEXA ORIGINAL</span><i>✦</i>
        </div>
      </div>

      <section id="collection" className="collection section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> 01 · The collection</p>
            <h2>FOUR FORMS.<br /><em>ONE IDENTITY.</em></h2>
          </div>
          <p>
            Choose an edition and watch the atmosphere, light and interface
            shift into its signature color system.
          </p>
        </div>

        <div className="collection-explorer">
          <div className="product-tabs" role="tablist" aria-label="VEXA editions">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={activeIndex === index ? "product-tab is-active" : "product-tab"}
                onClick={() => setActiveIndex(index)}
              >
                <span>{product.number}</span>
                <strong>{product.name}</strong>
                <small>{product.edition}</small>
                <i>↗</i>
              </button>
            ))}
          </div>

          <article className="active-product" key={`card-${active.id}`}>
            <div className="active-product-backdrop" />
            <div className="active-product-visual">
              <Image
                src={active.image}
                alt={`VEXA ${active.name} packaging design`}
                fill
                unoptimized
                sizes="(max-width: 800px) 100vw, 58vw"
                className="active-product-image"
              />
            </div>
            <div className="active-product-info">
              <p>{active.edition}</p>
              <h3>{active.name}</h3>
              <div className="color-line"><span /><small>{active.note}</small></div>
              <p className="product-copy">{active.copy}</p>
              <button className="detail-button" type="button" onClick={() => setModalProduct(active)}>
                View full design <span>↗</span>
              </button>
              <p className="adult-note">Non-commercial design study · Not for sale</p>
            </div>
          </article>
        </div>
      </section>

      <section className="spectrum section-pad">
        <div className="spectrum-noise" aria-hidden="true" />
        <div className="spectrum-head reveal">
          <p className="eyebrow"><span /> 02 · The color system</p>
          <h2>COLOR IS<br /><em>THE CODE.</em></h2>
          <p>
            Every edition keeps the VEXA logo, proportions and label structure
            locked in place. Only the visual frequency changes.
          </p>
        </div>

        <div className="spectrum-stage reveal">
          <div className="spectrum-preview" key={`spectrum-${active.id}`}>
            <div className="spectrum-halo" />
            <Image
              src={active.image}
              alt={`VEXA ${active.name} color system preview`}
              fill
              unoptimized
              sizes="(max-width: 800px) 100vw, 55vw"
            />
            <span className="spectrum-word">{active.name}</span>
          </div>

          <div className="spectrum-controls" role="tablist" aria-label="Explore VEXA color systems">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={activeIndex === index ? "spectrum-control is-active" : "spectrum-control"}
                onClick={() => setActiveIndex(index)}
                style={{ "--spectrum-color": product.accent } as React.CSSProperties}
              >
                <span>{product.number}</span>
                <div><strong>{product.name}</strong><small>{product.note}</small></div>
                <i />
              </button>
            ))}
          </div>
        </div>
        <div className="spectrum-meta reveal">
          <span>LOGO POSITION · LOCKED</span>
          <span>COLOR FREQUENCY · VARIABLE</span>
          <span>FORMAT · 330 ML</span>
          <span>SYSTEM · VEXA 01</span>
        </div>
      </section>

      <section id="system" className="formula section-pad">
        <div className="formula-head reveal">
          <div>
            <p className="eyebrow"><span /> 03 · System logic</p>
            <h2>DESIGN IN<br /><em>PLAIN SIGHT.</em></h2>
          </div>
          <p>
            A compact design language connects every edition: fixed geometry,
            deliberate typography, controlled color and motion with purpose.
          </p>
        </div>

        <div className="formula-layout">
          <div className="formula-number reveal">
            <span>VISUAL EDITIONS</span>
            <strong>04<sup>×</sup></strong>
            <p>
              One fixed identity grid expands into four distinct atmospheres
              without losing recognition or hierarchy.
            </p>
            <div className="signal-lines" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, index) => <i key={index} />)}
            </div>
          </div>

          <div className="ingredient-list reveal">
            {[
              ["01", "Logo position", "Locked"],
              ["02", "Pack geometry", "Fixed"],
              ["03", "Color frequency", "Variable"],
              ["04", "Type hierarchy", "Consistent"],
              ["05", "Interface motion", "Responsive"],
              ["06", "Product status", "Concept"],
            ].map(([number, name, amount]) => (
              <div className="ingredient-row" key={number}>
                <span>{number}</span>
                <strong>{name}</strong>
                <small>{amount}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="legal-warning reveal">
          <span className="warning-icon">i</span>
          <strong>DESIGN CASE / NON-COMMERCIAL</strong>
          <p>
            VEXA is presented here as a fictional packaging and digital design
              exercise. It is presented strictly as a non-commercial portfolio case.
          </p>
        </div>
      </section>

      <section className="edition-wall section-pad">
        <div className="wall-title reveal">
          <p className="eyebrow"><span /> 04 · Every angle</p>
          <h2>FOUR ANGLES.<br /><em>ONE SYSTEM.</em></h2>
        </div>
        <div className="edition-grid">
          {products.map((product) => (
            <button
              key={product.id}
              className="edition-card reveal"
              type="button"
              onClick={() => setModalProduct(product)}
              style={{ "--card-accent": product.accent } as React.CSSProperties}
              aria-label={`Open VEXA ${product.name}`}
            >
              <span className="edition-index">{product.number}</span>
              <div className="edition-image">
                <Image
                  src={product.image}
                  alt={`VEXA ${product.name}`}
                  fill
                  unoptimized
                  sizes="(max-width: 800px) 92vw, 46vw"
                />
              </div>
              <div className="edition-caption">
                <div><small>{product.edition}</small><strong>{product.name}</strong></div>
                <i>↗</i>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="about" className="about section-pad">
        <div className="about-watermark" aria-hidden="true">VEXA</div>
        <div className="about-grid">
          <div className="about-title reveal">
            <p className="eyebrow"><span /> 05 · Born independent</p>
            <h2>NOT A COPY.<br /><em>A SIGNAL OF ITS OWN.</em></h2>
          </div>
          <div className="about-copy reveal">
            <p className="lead">
              VEXA does not begin with an attempt to look like every other can.
              It begins with its own name, grid and visual language.
            </p>
            <p>
              An independent creative concept from Warsaw, combining a technical
              aesthetic, structured packaging and four expressions of one
              recognizable identity.
            </p>
            <div className="origin-stamp">
              <span>DESIGNED IN</span><strong>WARSAW</strong><small>POLAND · 2026</small>
            </div>
          </div>
        </div>

        <div className="principles">
          {[
            ["01", "One visual code", "One logo, one fixed position and four independent color worlds."],
            ["02", "Layout clarity", "Information is organized without unnecessary visual noise."],
            ["03", "Built as a case", "The system demonstrates identity, packaging and interactive motion."],
          ].map(([number, title, copy]) => (
            <article className="principle-card reveal" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div className="closing-light" aria-hidden="true" />
        <div className="closing-kinetic" aria-hidden="true">
          <span>VEXA · VEXA · VEXA · VEXA · VEXA ·</span>
          <span>ONE SYSTEM · FOUR EDITIONS · ONE SYSTEM · FOUR EDITIONS ·</span>
        </div>
        <p className="eyebrow centered reveal"><span /> VEXA · Creative case 01</p>
        <h2 className="reveal">THIS IS JUST<br /><em>THE BEGINNING.</em></h2>
        <p className="closing-copy reveal">
          Four editions. One system. A focused exploration of how packaging,
          typography, light and digital motion can speak with one voice.
        </p>
        <div className="closing-tags reveal">
          <span>IDENTITY</span><span>PACKAGING</span><span>COLOR SYSTEM</span><span>LABEL DESIGN</span>
        </div>
        <a className="solid-button reveal" href="#collection">Back to the editions <span>↑</span></a>
      </section>

      <footer className="footer">
        <a className="footer-logo" href="#top" aria-label="VEXA — back to top">VE<span>X</span>A</a>
        <div className="footer-nav">
          <a href="#collection">Editions</a>
          <a href="#system">Design system</a>
          <a href="#about">Case study</a>
        </div>
        <div className="footer-meta">
          <span>FICTIONAL DESIGN STUDY · NOT FOR SALE</span>
          <span>© 2026 VEXA CREATIVE CONCEPT</span>
        </div>
      </footer>

      {modalProduct && (
        <div
          className="product-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`VEXA ${modalProduct.name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalProduct(null);
          }}
        >
          <button className="modal-close" type="button" onClick={() => setModalProduct(null)} aria-label="Close">
            <span /> <span />
          </button>
          <div
            className="modal-card"
            style={
              {
                "--modal-accent": modalProduct.accent,
                "--modal-soft": modalProduct.accentSoft,
              } as React.CSSProperties
            }
          >
            <div className="modal-visual">
              <Image
                src={modalProduct.image}
                alt={`VEXA ${modalProduct.name} shown from the front and back`}
                fill
                unoptimized
                sizes="(max-width: 800px) 100vw, 65vw"
              />
            </div>
            <div className="modal-info">
              <p>{modalProduct.number} / 04 · {modalProduct.edition}</p>
              <h2>{modalProduct.name}</h2>
              <span>{modalProduct.note}</span>
              <p>{modalProduct.copy}</p>
              <small>330 ML FORMAT · FICTIONAL PACKAGING STUDY</small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
