import { useState, useEffect } from 'react';
import { useRouter, ViewportMode } from '../hooks/useRouter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ProjectEstimator } from '../components/ProjectEstimator';

export function PortfolioHome() {
  const { navigate, setViewportMode, currentYear } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollReveal();

  useEffect(() => {
    document.title = 'Small Business Sites — Web Design & Conversion Studio';
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  };

  const launchConcept = (path: string, mode: ViewportMode = 'full') => {
    setViewportMode(mode);
    navigate(path);
  };

  return (
    <div className="portfolio-theme">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Top Bar Contract: 3 zones, 1 line */}
      <header className="site-header">
        <div className="shell">
          {/* Zone 1: Brand wordmark */}
          <a
            className="brand"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Small Business Sites, back to top"
          >
            <span className="brand-mark" aria-hidden="true">
              S
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem' }}>
              Small Business Sites
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Zone 2: Single-line text navigation links */}
          <nav
            className={`site-nav ${menuOpen ? 'is-open' : ''}`}
            id="site-navigation"
            aria-label="Main navigation"
          >
            <a href="#work" onClick={(e) => handleAnchorClick(e, 'work')}>
              Selected Concepts
            </a>
            <a href="#standards" onClick={(e) => handleAnchorClick(e, 'standards')}>
              Our Standards
            </a>
            <a href="#comparison" onClick={(e) => handleAnchorClick(e, 'comparison')}>
              Why Custom Beats Templates
            </a>
            <a href="#estimator" onClick={(e) => handleAnchorClick(e, 'estimator')}>
              Project Estimator
            </a>
            {/* Zone 3: Primary CTA */}
            <a
              className="btn btn-primary btn-sm"
              href="#estimator"
              onClick={(e) => handleAnchorClick(e, 'estimator')}
            >
              Estimate Your Project
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section className="portfolio-hero">
          <div className="shell">
            <div className="rise reveal" style={{ maxWidth: '640px' }}>
              <p className="eyebrow" style={{ letterSpacing: '0.14em' }}>
                Bespoke Digital Design &amp; Conversion
              </p>
              <h1 className="display" style={{ textWrap: 'balance' }}>
                Websites that turn local searches into <em>lifelong customers.</em>
              </h1>
              <p
                style={{
                  margin: '24px 0 32px',
                  fontSize: '1.15rem',
                  color: 'var(--muted)',
                  lineHeight: '1.7',
                }}
              >
                We engineer fast-loading digital presences for small service businesses — replacing
                clunky generic templates with editorial craft, transparent pricing tools, and
                frictionless booking.
              </p>
              <div className="btn-row">
                <a
                  className="btn btn-primary"
                  href="#work"
                  onClick={(e) => handleAnchorClick(e, 'work')}
                >
                  Explore Client Concepts →
                </a>
                <a
                  className="btn btn-outline"
                  href="#estimator"
                  onClick={(e) => handleAnchorClick(e, 'estimator')}
                >
                  Configure Scope &amp; Pricing
                </a>
              </div>
            </div>

            {/* Right Column: Studio Creative Visual */}
            <div className="rise reveal hero-visual-wrapper" style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  boxShadow: 'var(--shadow-lift)',
                  position: 'relative',
                  aspectRatio: '16 / 10',
                }}
              >
                <img
                  src="/src/assets/images/hero_creative_studio_1793511622215.jpg"
                  alt="Modern creative architectural design studio bathed in soft natural daylight"
                  width={1400}
                  height={875}
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 60%, rgba(20, 25, 22, 0.7) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  <span>Studio Practice · Handcrafted Code</span>
                  <span>100% Zero-Template Policy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Column Verifiable Architectural & Feature Strip */}
        <section
          style={{
            background: 'var(--card)',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            padding: '36px 0',
          }}
          aria-label="Verified Platform Features"
        >
          <div className="shell">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '32px',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.6rem',
                    color: 'var(--primary)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  2
                </span>
                <strong style={{ display: 'block', fontSize: '0.94rem', margin: '6px 0 2px' }}>
                  Live Client Concepts
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                  GreenLine and BrightSide: two fully interactive, distinct concept sites.
                </p>
              </div>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.6rem',
                    color: 'var(--accent)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  3
                </span>
                <strong style={{ display: 'block', fontSize: '0.94rem', margin: '6px 0 2px' }}>
                  Device Viewports
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                  Test all pages in full screen, 768px tablet, or 390px phone chassis directly.
                </p>
              </div>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.6rem',
                    color: 'var(--ok)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  100%
                </span>
                <strong style={{ display: 'block', fontSize: '0.94rem', margin: '6px 0 2px' }}>
                  Custom React &amp; TypeScript
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                  Handcrafted modular code with zero WordPress, Wix, or page-builder dependencies.
                </p>
              </div>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.6rem',
                    color: 'var(--primary)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  0
                </span>
                <strong style={{ display: 'block', fontSize: '0.94rem', margin: '6px 0 2px' }}>
                  Third-Party Tracking Bloat
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: 0 }}>
                  No analytics trackers, ad scripts, or marketing cookies slowing down your visitors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Concepts Section */}
        <section className="section shell" id="work" aria-labelledby="work-title">
          <div
            className="section-head"
            style={{ borderBottom: '1px solid var(--line)', paddingBottom: '28px' }}
          >
            <div>
              <p className="eyebrow">Interactive Demonstrations</p>
              <h2 className="display" id="work-title">
                Selected client concepts.
              </h2>
            </div>
            <p
              className="muted"
              style={{ maxWidth: '440px', fontSize: '0.95rem', lineHeight: '1.6' }}
            >
              Two specialized service sectors. Two tailored visual languages. Experience how
              custom visual storytelling and instant pricing tools eliminate friction for customers.
            </p>
          </div>

          <div className="grid-2">
            {/* Concept 1: GreenLine */}
            <div
              className="card project reveal"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className="card-media" style={{ position: 'relative' }}>
                <img
                  src="/src/assets/images/greenline_lush_lawn_1793511623174.jpg"
                  alt="Pristine emerald lawn and contemporary landscaping in golden afternoon light"
                  width={1200}
                  height={800}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="badge">Lawn &amp; Outdoor Living</span>
              </div>
              <div className="card-body">
                {/* Zero-Pill Unboxed Text Metadata */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--muted)',
                  }}
                >
                  <span>Concept 01</span>
                  <span aria-hidden="true">·</span>
                  <span>Interactive Yard Work Order</span>
                  <span aria-hidden="true">·</span>
                  <span>Same-Day Routing</span>
                </div>

                <h3>GreenLine Lawn Care</h3>
                <p className="muted" style={{ lineHeight: '1.6' }}>
                  A high-trust lawn care identity engineered for conversion. Features an interactive
                  yard visualizer, clear recurring service tiers, and zero-confusion estimate
                  requests.
                </p>

                {/* Device preview trigger row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '12px 0 8px',
                    padding: '8px 12px',
                    background: 'var(--soft)',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--fg)' }}>Test in Viewport:</span>
                  <button
                    type="button"
                    onClick={() => launchConcept('/greenline-lawn-care', 'full')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--ok)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    Desktop ↗
                  </button>
                  <span style={{ color: 'var(--line)' }}>|</span>
                  <button
                    type="button"
                    onClick={() => launchConcept('/greenline-lawn-care', 'tablet')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--fg)',
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    Tablet (768px)
                  </button>
                  <span style={{ color: 'var(--line)' }}>|</span>
                  <button
                    type="button"
                    onClick={() => launchConcept('/greenline-lawn-care', 'mobile')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--fg)',
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    Phone (390px)
                  </button>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => launchConcept('/greenline-lawn-care', 'full')}
                    style={{ width: '100%' }}
                  >
                    Launch Full GreenLine Experience →
                  </button>
                </div>
              </div>
            </div>

            {/* Concept 2: BrightSide */}
            <div
              className="card project reveal"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className="card-media" style={{ position: 'relative' }}>
                <img
                  src="/src/assets/images/brightside_serene_home_1793511623291.jpg"
                  alt="Bright and airy Scandinavian living room with natural linen and clean calm surfaces"
                  width={1200}
                  height={800}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="badge">Residential Cleaning</span>
              </div>
              <div className="card-body">
                {/* Zero-Pill Unboxed Text Metadata */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--muted)',
                  }}
                >
                  <span>Concept 02</span>
                  <span aria-hidden="true">·</span>
                  <span>Room &amp; Linen Ledger</span>
                  <span aria-hidden="true">·</span>
                  <span>Editorial Calm</span>
                </div>

                <h3>BrightSide Home Cleaning</h3>
                <p className="muted" style={{ lineHeight: '1.6' }}>
                  A warm, editorial residential cleaning brand built around tranquility and trust.
                  Includes an interactive room &amp; bathroom estimator and multi-tier checklist
                  comparisons.
                </p>

                {/* Device preview trigger row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    margin: '12px 0 8px',
                    padding: '8px 12px',
                    background: 'var(--soft)',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--fg)' }}>Test in Viewport:</span>
                  <button
                    type="button"
                    onClick={() => launchConcept('/brightside-cleaning', 'full')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    Desktop ↗
                  </button>
                  <span style={{ color: 'var(--line)' }}>|</span>
                  <button
                    type="button"
                    onClick={() => launchConcept('/brightside-cleaning', 'tablet')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--fg)',
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    Tablet (768px)
                  </button>
                  <span style={{ color: 'var(--line)' }}>|</span>
                  <button
                    type="button"
                    onClick={() => launchConcept('/brightside-cleaning', 'mobile')}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--fg)',
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    Phone (390px)
                  </button>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <button
                    type="button"
                    className="btn btn-accent btn-sm"
                    onClick={() => launchConcept('/brightside-cleaning', 'full')}
                    style={{ width: '100%' }}
                  >
                    Launch Full BrightSide Experience →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Standards Section */}
        <section
          className="section section-dark approach"
          id="standards"
          aria-labelledby="standards-title"
        >
          <div className="shell">
            <div>
              <p className="eyebrow" style={{ color: 'rgb(239 236 229 / 60%)' }}>
                Studio Philosophy
              </p>
              <h2 className="display" id="standards-title">
                What separates good design from revenue-generating design.
              </h2>
              <p
                style={{
                  marginTop: '18px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  maxWidth: '480px',
                }}
              >
                Local service websites usually fail because they make prospective customers do
                homework. We remove friction at every touchpoint.
              </p>
            </div>

            <div className="principles reveal">
              <div>
                <span className="num">01.</span>
                <b>Make the next action effortless</b>
                <p className="muted">
                  A homeowner visiting on a smartphone shouldn't have to navigate a maze. Whether it's
                  calculating an instant estimate or tapping to call, the desired outcome is always 1
                  click away.
                </p>
              </div>

              <div>
                <span className="num">02.</span>
                <b>Design authentic to the trade</b>
                <p className="muted">
                  A lawn care company needs crisp organic vigor and reliability; a luxury cleaning
                  company requires tranquility and spotless confidence. Every font and palette choice
                  reinforces trust.
                </p>
              </div>

              <div>
                <span className="num">03.</span>
                <b>Engineered for one-thumb mobile</b>
                <p className="muted">
                  Most local home service searches occur on mobile devices. We test layouts with
                  real finger reach zones, single-line labels, and sticky actions that never block the screen.
                </p>
              </div>

              <div>
                <span className="num">04.</span>
                <b>Speed is a competitive advantage</b>
                <p className="muted">
                  No bloated WordPress themes or sluggish page builders. Pure code with instant
                  loading prevents bounce rates and signals competence to Google and customers alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom vs Template Comparison Matrix (Factual & Verified) */}
        <section
          className="section shell reveal"
          id="comparison"
          aria-labelledby="comparison-title"
        >
          <div style={{ maxWidth: '720px', marginBottom: '44px' }}>
            <p className="eyebrow">Strategic Value</p>
            <h2 className="display" id="comparison-title">
              Why custom builds beat generic site templates.
            </h2>
            <p className="muted" style={{ marginTop: '14px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Most local service businesses settle for generic templates that look like hundreds
              of competitors. Here is the architectural difference handcrafted code makes.
            </p>
          </div>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: '20px',
              border: '1px solid var(--line)',
              background: 'var(--card)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '0.92rem',
              }}
            >
              <thead>
                <tr style={{ background: 'var(--soft)', borderBottom: '1px solid var(--line)' }}>
                  <th style={{ padding: '18px 24px', fontWeight: 700, color: 'var(--fg)', width: '30%' }}>
                    Architecture &amp; Features
                  </th>
                  <th style={{ padding: '18px 24px', fontWeight: 600, color: 'var(--muted)', width: '35%' }}>
                    Standard DIY / Generic Themes
                  </th>
                  <th
                    style={{
                      padding: '18px 24px',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'rgba(35, 43, 36, 0.04)',
                      width: '35%',
                    }}
                  >
                    Handcrafted React Engineering
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '18px 24px', fontWeight: 600 }}>Interactive Estimators</td>
                  <td style={{ padding: '18px 24px', color: 'var(--muted)' }}>
                    Static contact forms with no instant quote feedback.
                  </td>
                  <td style={{ padding: '18px 24px', color: 'var(--fg)', fontWeight: 500 }}>
                    <strong>Interactive instant estimators</strong> (like GreenLine's yard ticket or
                    BrightSide's room ledger) that give instant answers.
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '18px 24px', fontWeight: 600 }}>Runtime Dependencies</td>
                  <td style={{ padding: '18px 24px', color: 'var(--muted)' }}>
                    Multiple external plugins, database drivers, and page builder bloat.
                  </td>
                  <td style={{ padding: '18px 24px', color: 'var(--ok)', fontWeight: 600 }}>
                    Clean modern React + TypeScript bundle with zero external plugin dependencies.
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '18px 24px', fontWeight: 600 }}>Visual Craft &amp; Identity</td>
                  <td style={{ padding: '18px 24px', color: 'var(--muted)' }}>
                    Stock templates with mismatched typography and clunky default spacing.
                  </td>
                  <td style={{ padding: '18px 24px', color: 'var(--fg)', fontWeight: 500 }}>
                    <strong>Bespoke typography and curated color systems</strong> tailored
                    specifically to your service industry.
                  </td>
                </tr>

                <tr>
                  <td style={{ padding: '18px 24px', fontWeight: 600 }}>Accessibility &amp; Mobile UX</td>
                  <td style={{ padding: '18px 24px', color: 'var(--muted)' }}>
                    Tiny touch buttons, hidden phone numbers, and slow mobile loading.
                  </td>
                  <td style={{ padding: '18px 24px', color: 'var(--fg)', fontWeight: 500 }}>
                    Single-thumb friendly touch targets, accessible ARIA states, and tap-to-call.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Scope & Pricing Estimator Tool with Lower Pricing */}
        <ProjectEstimator />
      </main>

      {/* Quiet, Professional Studio Footer */}
      <footer className="site-footer">
        <div className="shell">
          <div>
            <a className="brand" href="/" style={{ marginBottom: '8px' }}>
              <span className="brand-mark" aria-hidden="true">
                S
              </span>
              <span>Small Business Sites</span>
            </a>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: '4px 0 0' }}>
              © <span>{currentYear}</span> Small Business Sites · Handcrafted digital experiences for
              premier service businesses.
            </p>
          </div>

          <nav aria-label="Footer concepts and quick links">
            <button
              type="button"
              onClick={() => launchConcept('/greenline-lawn-care')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: '0.88rem',
              }}
            >
              GreenLine Lawn Care
            </button>
            <button
              type="button"
              onClick={() => launchConcept('/brightside-cleaning')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: '0.88rem',
              }}
            >
              BrightSide Home Cleaning
            </button>
            <a
              href="https://github.com/orondee/small-business-websites"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
