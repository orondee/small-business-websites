import { useState, useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ViewportFrame } from '../components/ViewportFrame';

interface ServiceAddon {
  id: string;
  name: string;
  detail: string;
  price: number;
}

const YARD_PROFILES = [
  {
    id: 'townhome',
    name: 'Townhome / Courtyard',
    sqft: 'Up to 3,000 sq ft',
    weeklyRate: 42,
    biweeklyRate: 55,
    mowTime: '20–25 mins',
    graphicWidth: '38%',
  },
  {
    id: 'suburban',
    name: 'Standard Suburban Yard',
    sqft: '3,000 – 7,000 sq ft',
    weeklyRate: 54,
    biweeklyRate: 70,
    mowTime: '35–45 mins',
    graphicWidth: '60%',
  },
  {
    id: 'corner',
    name: 'Corner Lot & Long Edges',
    sqft: '7,000 – 14,000 sq ft',
    weeklyRate: 68,
    biweeklyRate: 88,
    mowTime: '55–65 mins',
    graphicWidth: '80%',
  },
  {
    id: 'estate',
    name: 'Private Grounds / Estate',
    sqft: '14,000+ sq ft',
    weeklyRate: 95,
    biweeklyRate: 125,
    mowTime: '80–100 mins',
    graphicWidth: '100%',
  },
];

const ADDONS: ServiceAddon[] = [
  { id: 'edges', name: 'Precision Trench Spade Edging', detail: 'Deep cut definition along flower beds & curb', price: 22 },
  { id: 'weeding', name: 'Curated Garden Bed Weeding', detail: 'Hand-weeding & root extraction', price: 25 },
  { id: 'shrubs', name: 'Ornamental Shrub Pruning', detail: 'Shape & hedge shearing up to 8ft', price: 34 },
  { id: 'fertilizer', name: 'Slow-Release Organic Turf Feeding', detail: 'Pet-safe seasonal fertilization', price: 28 },
];

export function GreenLinePage() {
  const { navigate, viewportMode, setViewportMode, currentYear } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Yard calculator state
  const [selectedYardId, setSelectedYardId] = useState('suburban');
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly'>('weekly');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['edges']);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedPreview, setSubmittedPreview] = useState<{
    name: string;
    email: string;
    address: string;
    message: string;
    estimatedQuote: string;
  } | null>(null);

  useScrollReveal();

  useEffect(() => {
    document.title = 'GreenLine Lawn Care — A Lawn You Love Coming Home To';
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

  // Calculations
  const currentYard = YARD_PROFILES.find((y) => y.id === selectedYardId) || YARD_PROFILES[1];
  const baseRate = frequency === 'weekly' ? currentYard.weeklyRate : currentYard.biweeklyRate;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalVisitEstimate = baseRate + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applyEstimateToForm = () => {
    const yardName = currentYard.name;
    const freqLabel = frequency === 'weekly' ? 'Weekly schedule' : 'Bi-weekly schedule';
    const addonLabels = selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).join(' + ');

    const ticketSummary = `FIELD WORK ORDER ESTIMATE:
- Property Profile: ${yardName} (${currentYard.sqft})
- Cadence: ${freqLabel}
- Estimated Crew Duration: ~${currentYard.mowTime}
- Add-On Services: ${addonLabels || 'Basic Mow & Edge Only'}
- Calculated Estimate: ~$${totalVisitEstimate} per visit

Please confirm crew availability for my neighborhood address.`;

    setFormData((prev) => ({
      ...prev,
      message: ticketSummary,
    }));

    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Please provide your street address or neighborhood.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please let us know what you need help with.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedPreview({
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        message: formData.message.trim(),
        estimatedQuote: `$${totalVisitEstimate} / visit (${frequency === 'weekly' ? 'Weekly' : 'Bi-weekly'})`,
      });
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', address: '', message: '' });
    setSubmittedPreview(null);
    setErrors({});
  };

  return (
    <ViewportFrame conceptName="GreenLine Lawn Care">
      <div className="greenline-theme">
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        {/* Demo Notice & Viewport Switcher */}
        <div
          style={{
            padding: '10px 16px',
            background: 'var(--surface)',
            color: 'var(--on-surface)',
            fontSize: '0.82rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            className="shell"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <span>Portfolio Concept · GreenLine Lawn Care</span>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  marginLeft: '8px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                ← Back to Studio Hub
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
                Preview Mode:
              </span>
              <button
                type="button"
                onClick={() => setViewportMode('full')}
                style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewportMode === 'full' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Full Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('tablet')}
                style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewportMode === 'tablet' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Tablet (768px)
              </button>
              <button
                type="button"
                onClick={() => setViewportMode('mobile')}
                style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewportMode === 'mobile' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                Phone (390px)
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="site-header">
          <div className="shell">
            <a
              className="brand"
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="GreenLine Lawn Care, back to top"
            >
              <span className="brand-mark" aria-hidden="true">
                G
              </span>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                GreenLine <small style={{ fontWeight: 500, opacity: 0.8 }}>Lawn Care</small>
              </span>
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="greenline-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
            </button>

            <nav
              className={`site-nav ${menuOpen ? 'is-open' : ''}`}
              id="greenline-navigation"
              aria-label="Main navigation"
            >
              <a href="#services" onClick={(e) => handleAnchorClick(e, 'services')}>
                Services
              </a>
              <a href="#estimator" onClick={(e) => handleAnchorClick(e, 'estimator')}>
                Yard Visualizer
              </a>
              <a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>
                About
              </a>
              <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>
                Contact
              </a>
              <a
                className="btn btn-primary btn-sm"
                href="#estimator"
                onClick={(e) => handleAnchorClick(e, 'estimator')}
              >
                Get a Free Estimate
              </a>
            </nav>
          </div>
        </header>

        <main id="main">
          {/* Hero */}
          <section className="greenline-hero" aria-labelledby="hero-title">
            <img
              src="/src/assets/images/greenline_lush_lawn_1793511623174.jpg"
              alt="Pristine emerald residential lawn with clean flagstone walkway in golden evening light"
              width={1800}
              height={1200}
              referrerPolicy="no-referrer"
            />
            <div className="shell">
              <p className="eyebrow rise reveal">Your neighborhood, a little greener</p>
              <h1 id="hero-title" className="rise reveal" style={{ textWrap: 'balance' }}>
                A lawn you love coming home to.
              </h1>
              <p className="lead rise reveal">
                Reliable weekly visits, razor-sharp edges, and thoughtful lawn care that gives you back
                your weekends. Friendly neighborhood crews, tidy results, zero contracts.
              </p>
              <div className="btn-row rise reveal">
                <a
                  className="btn btn-accent"
                  href="#estimator"
                  onClick={(e) => handleAnchorClick(e, 'estimator')}
                >
                  Configure Your Yard Work Order →
                </a>
                <a
                  className="btn btn-outline"
                  href="#services"
                  onClick={(e) => handleAnchorClick(e, 'services')}
                >
                  Explore Services
                </a>
              </div>
            </div>
          </section>

          {/* Perks Bar */}
          <section className="perks reveal" aria-label="Why GreenLine">
            <ul className="shell">
              <li>
                <span aria-hidden="true">📅</span>Same-Day Weekly Visits
              </li>
              <li>
                <span aria-hidden="true">✓</span>Transparent Fixed Pricing
              </li>
              <li>
                <span aria-hidden="true">✦</span>Crisp Edges &amp; Blown Clean
              </li>
              <li>
                <span aria-hidden="true">☀</span>Reclaim Your Weekends
              </li>
            </ul>
          </section>

          {/* UNIQUE PRICING SECTION: Turf Scope & Digital Route Work Order Slip */}
          <section
            className="section shell reveal"
            id="estimator"
            aria-labelledby="estimator-title"
          >
            <div style={{ maxWidth: '780px', marginBottom: '36px' }}>
              <p className="eyebrow" style={{ color: 'var(--ok)' }}>
                Field Estimate Configurator
              </p>
              <h2 id="estimator-title" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
                Select your yard profile. Get an instant work order price.
              </h2>
              <p className="muted" style={{ marginTop: '12px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Every yard is different. Select your approximate lot boundary and add-on services to
                see an authentic field estimate before we even visit.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
                gap: '36px',
                alignItems: 'start',
              }}
              className="calculator-grid"
            >
              {/* Left Configurator Column: Turf Map Selector */}
              <div>
                {/* 1. Lot Size Architecture Selector */}
                <div
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    borderRadius: '24px',
                    padding: '28px',
                    marginBottom: '24px',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <strong style={{ fontSize: '0.92rem', color: 'var(--fg)' }}>
                      1. Property Lot Footprint
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--ok)', fontWeight: 700 }}>
                      Est. Mowing: {currentYard.mowTime}
                    </span>
                  </div>

                  {/* Interactive Yard Footprint Visualizer */}
                  <div
                    style={{
                      height: '110px',
                      background: 'var(--soft)',
                      borderRadius: '16px',
                      border: '1px dashed var(--line)',
                      marginBottom: '20px',
                      padding: '12px 18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: '18px',
                        top: '12px',
                        bottom: '12px',
                        width: currentYard.graphicWidth,
                        background: 'rgba(47, 138, 85, 0.18)',
                        borderRadius: '10px',
                        border: '2px solid var(--ok)',
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      Active Turf Zone · {currentYard.sqft}
                    </div>

                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        fontSize: '0.74rem',
                        color: 'var(--muted)',
                      }}
                    >
                      <span>Architectural Lot Scaler</span>
                    </div>

                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.74rem',
                        color: 'var(--muted)',
                      }}
                    >
                      <span>Flagstone Path Perimeter</span>
                      <span>Property Boundary</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {YARD_PROFILES.map((yard) => {
                      const isSelected = selectedYardId === yard.id;
                      return (
                        <button
                          key={yard.id}
                          type="button"
                          onClick={() => setSelectedYardId(yard.id)}
                          style={{
                            padding: '14px',
                            borderRadius: '14px',
                            border: isSelected ? '2px solid var(--ok)' : '1px solid var(--line)',
                            background: isSelected ? 'var(--soft)' : '#ffffff',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--fg)' }}>
                            {yard.name}
                          </strong>
                          <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                            {yard.sqft}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Frequency & Add-ons */}
                <div
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    borderRadius: '24px',
                    padding: '28px',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '0.92rem',
                      color: 'var(--fg)',
                      marginBottom: '14px',
                    }}
                  >
                    2. Service Cadence &amp; Specialized Add-Ons
                  </strong>

                  {/* Frequency toggle */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setFrequency('weekly')}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: frequency === 'weekly' ? '2px solid var(--primary)' : '1px solid var(--line)',
                        background: frequency === 'weekly' ? 'var(--soft)' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.88rem' }}>Weekly Care</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--ok)', fontWeight: 600 }}>
                        Best for lawn health
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFrequency('biweekly')}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: frequency === 'biweekly' ? '2px solid var(--primary)' : '1px solid var(--line)',
                        background: frequency === 'biweekly' ? 'var(--soft)' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.88rem' }}>Bi-Weekly Care</strong>
                      <span style={{ fontSize: '0.76rem', color: 'var(--muted)' }}>
                        Every other week
                      </span>
                    </button>
                  </div>

                  {/* Addons list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ADDONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            border: isChecked ? '1px solid var(--ok)' : '1px solid var(--line)',
                            background: isChecked ? 'var(--soft)' : 'transparent',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddon(addon.id)}
                              style={{ accentColor: 'var(--ok)', width: '16px', height: '16px' }}
                            />
                            <div>
                              <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--fg)' }}>
                                {addon.name}
                              </strong>
                              <span style={{ fontSize: '0.74rem', color: 'var(--muted)' }}>
                                {addon.detail}
                              </span>
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: 'var(--primary)',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            +${addon.price}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Output: Unique Field Work Order Slip Ticket */}
              <div
                style={{
                  background: 'var(--surface)',
                  color: 'var(--on-surface)',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  boxShadow: 'var(--shadow-lift)',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Simulated work order header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px dashed rgba(255, 255, 255, 0.2)',
                    paddingBottom: '14px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.74rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                    }}
                  >
                    WORK-ORDER #GL-772
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Maplewood Field Route
                  </span>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '4px',
                    }}
                  >
                    Calculated Per-Visit Cost
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3.6rem',
                        fontWeight: 800,
                        lineHeight: 1,
                        color: 'var(--accent)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      ${totalVisitEstimate}
                    </span>
                    <span style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      / visit · {frequency === 'weekly' ? 'Weekly Service' : 'Bi-Weekly Service'}
                    </span>
                  </div>
                </div>

                {/* Itemized Receipt Line Items */}
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '20px',
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Base Turf Mow &amp; Clean:</span>
                    <strong style={{ fontVariantNumeric: 'tabular-nums' }}>${baseRate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.7)', fontSize: '0.76rem', marginBottom: '8px' }}>
                    <span>Scope: {currentYard.name}</span>
                    <span>~{currentYard.mowTime}</span>
                  </div>

                  {selectedAddons.map((id) => {
                    const addon = ADDONS.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div
                        key={id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
                          paddingTop: '4px',
                          marginTop: '4px',
                        }}
                      >
                        <span style={{ color: 'rgba(255,255,255,0.85)' }}>+ {addon.name}:</span>
                        <strong style={{ fontVariantNumeric: 'tabular-nums' }}>+${addon.price}</strong>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="btn btn-accent"
                  style={{ width: '100%', fontSize: '0.92rem' }}
                  onClick={applyEstimateToForm}
                >
                  Transfer Work Order to Request Form ↓
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '16px',
                    fontSize: '0.74rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <span>✓ Gates Latched Guaranteed</span>
                  <span>·</span>
                  <span>✓ No Long-Term Contracts</span>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="section shell reveal" id="services" aria-labelledby="services-title">
            <div className="section-head">
              <div>
                <p className="eyebrow">Service Menu</p>
                <h2 id="services-title">Care for every corner of your yard.</h2>
              </div>
              <p className="muted" style={{ maxWidth: '420px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                From weekly precision trims to complete seasonal refreshes, we keep your outdoor
                space looking pristine without fuss.
              </p>
            </div>

            <div className="grid-3">
              <article className="card service reveal">
                <div className="card-media">
                  <img
                    src="/src/assets/images/greenline_lush_lawn_1793511623174.jpg"
                    alt="Freshly cut green lawn in bright afternoon sunlight"
                    width={900}
                    height={675}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card-body">
                  <p className="num">01 / The Essential</p>
                  <h3>Regular Lawn Mowing</h3>
                  <p className="muted">
                    Crisp, even heights calibrated to grass species, sharp blade edging along walkways,
                    and clean debris blowout.
                  </p>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ok)' }}>
                    Starting from $42 / visit
                  </span>
                  <a
                    className="card-link"
                    href="#estimator"
                    onClick={(e) => handleAnchorClick(e, 'estimator')}
                  >
                    Calculate your price ↗
                  </a>
                </div>
              </article>

              <article className="card service reveal">
                <div className="card-media">
                  <img
                    src="/src/assets/images/greenline_garden_detail_1793511624117.jpg"
                    alt="Curated garden bed with rich dark mulch, lavender, and crisp lawn edging"
                    width={900}
                    height={675}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card-body">
                  <p className="num">02 / The Refresh</p>
                  <h3>Garden Bed Tidy-Up</h3>
                  <p className="muted">
                    Hand-weeding, crisp spade edge definition, seasonal plant trimming, and rich dark
                    organic mulch replenishment.
                  </p>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ok)' }}>
                    Fixed per-bed project pricing
                  </span>
                  <a
                    className="card-link"
                    href="#estimator"
                    onClick={(e) => handleAnchorClick(e, 'estimator')}
                  >
                    Request bed estimate ↗
                  </a>
                </div>
              </article>

              <article className="card service reveal">
                <div className="card-media">
                  <img
                    src="https://images.unsplash.com/photo-1742519787699-df9581475f0a?auto=format&fit=crop&w=900&q=80"
                    alt="Autumn leaves scattered across a lawn before clean up"
                    width={900}
                    height={675}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card-body">
                  <p className="num">03 / The Finishing Touch</p>
                  <h3>Seasonal Cleanups</h3>
                  <p className="muted">
                    Full property leaf removal, fall aeration &amp; overseeding, spring dethatching, and
                    curbside haul-away.
                  </p>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ok)' }}>
                    Spring &amp; Fall packages available
                  </span>
                  <a
                    className="card-link"
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, 'contact')}
                  >
                    Ask about cleanups ↗
                  </a>
                </div>
              </article>
            </div>
          </section>

          {/* About */}
          <section
            className="section section-dark greenline-about reveal"
            id="about"
            aria-labelledby="about-title"
          >
            <div className="shell">
              <div className="about-photos">
                <img
                  src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80"
                  alt="Sunlight falling across a green field"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/src/assets/images/greenline_garden_detail_1793511624117.jpg"
                  alt="Manicured garden bed and lavender"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="eyebrow">Local Crews, Serious Craft</p>
                <h2 id="about-title">A good lawn is about more than grass.</h2>
                <p className="big muted">
                  It's where your kids run barefoot, where neighbors stop to say hello on warm summer
                  evenings, and where you finally get to sit down after a long work week.
                </p>
                <p className="muted" style={{ fontSize: '0.92rem', lineHeight: '1.7' }}>
                  We believe lawn care should be completely predictable: same crew every visit, gates
                  always latched, and clippings cleanly blown away. No contracts, no ghosting, and no
                  hassle.
                </p>
                <div className="btn-row reveal" style={{ marginTop: '28px' }}>
                  <a
                    className="btn btn-accent"
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, 'contact')}
                  >
                    Schedule an Estimate Walk →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section
            className="section shell greenline-contact reveal"
            id="contact"
            aria-labelledby="contact-title"
          >
            <div>
              <p className="eyebrow">Your Next Weekend, Reclaimed</p>
              <h2 id="contact-title">Let's talk about your yard.</h2>
              <p className="muted" style={{ marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Fill out the estimate form, or reach out directly. We typically confirm schedule
                windows within 4 business hours.
              </p>
              <ul className="contact-list">
                <li>
                  <span className="icon" aria-hidden="true">
                    ✉
                  </span>
                  <span>
                    <small>Email</small>
                    <a href="mailto:hello@greenlinelawn.example">hello@greenlinelawn.example</a>
                  </span>
                </li>
                <li>
                  <span className="icon" aria-hidden="true">
                    ☏
                  </span>
                  <span>
                    <small>Direct Phone &amp; Text</small>
                    <a href="tel:+15550140123">(555) 014-0123</a>
                  </span>
                </li>
                <li>
                  <span className="icon" aria-hidden="true">
                    ⌖
                  </span>
                  <span>
                    <small>Serving Neighborhoods</small>
                    <b>Maplewood, Millburn, Summit, Short Hills &amp; Chatham</b>
                  </span>
                </li>
              </ul>
            </div>

            <form className="form-card" id="demo-form" noValidate onSubmit={handleSubmit}>
              <h3>Request Your Free Estimate</h3>
              <p>Demo portfolio request form — confirms details instantly in your browser.</p>

              {submittedPreview ? (
                <div
                  style={{
                    background: 'var(--soft)',
                    padding: '24px',
                    borderRadius: '18px',
                    border: '1px solid var(--line)',
                  }}
                >
                  <p
                    className="form-status"
                    style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: 'var(--ok)' }}
                  >
                    ✓ Estimate Request Received!
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--fg)', lineHeight: '1.6', margin: 0 }}>
                    <strong>Client:</strong> {submittedPreview.name}
                    <br />
                    <strong>Email:</strong> {submittedPreview.email}
                    <br />
                    <strong>Property:</strong> {submittedPreview.address}
                    <br />
                    <strong>Calculated Rate:</strong> {submittedPreview.estimatedQuote}
                  </p>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      padding: '12px',
                      borderRadius: '10px',
                      marginTop: '12px',
                      fontSize: '0.82rem',
                      color: 'var(--muted)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {submittedPreview.message}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '18px', width: '100%' }}
                    onClick={handleReset}
                  >
                    Submit Another Estimate
                  </button>
                </div>
              ) : (
                <>
                  <div className="field">
                    <label htmlFor="visitor-name">Your Full Name</label>
                    <input
                      id="visitor-name"
                      name="name"
                      autoComplete="name"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'visitor-name-error' : undefined}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                    />
                    {errors.name && (
                      <p className="field-error" id="visitor-name-error" aria-live="polite">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="visitor-email">Email Address</label>
                    <input
                      id="visitor-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="sarah@example.com"
                      value={formData.email}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'visitor-email-error' : undefined}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                    />
                    {errors.email && (
                      <p className="field-error" id="visitor-email-error" aria-live="polite">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="visitor-address">Property Address or Cross Streets</label>
                    <input
                      id="visitor-address"
                      name="address"
                      placeholder="e.g. 142 Elmwood Ave, Maplewood"
                      value={formData.address}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'visitor-address-error' : undefined}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: '' });
                      }}
                    />
                    {errors.address && (
                      <p className="field-error" id="visitor-address-error" aria-live="polite">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="visitor-message">Project Notes &amp; Estimated Requirements</label>
                    <textarea
                      id="visitor-message"
                      name="message"
                      rows={4}
                      placeholder="Let us know about fence gates, pets, or specific garden areas..."
                      value={formData.message}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'visitor-message-error' : undefined}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                    />
                    {errors.message && (
                      <p className="field-error" id="visitor-message-error" aria-live="polite">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button className="btn btn-primary" type="submit">
                    Send Free Estimate Request →
                  </button>
                </>
              )}
            </form>
          </section>
        </main>

        <footer className="site-footer">
          <div className="shell">
            <a
              className="brand"
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="brand-mark" aria-hidden="true">
                G
              </span>
              <span>GreenLine Lawn Care</span>
            </a>
            <span>
              © <span>{currentYear}</span> GreenLine Lawn Care · Fictional Brand Portfolio Demo
            </span>
            <nav aria-label="Footer links">
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                }}
              >
                Portfolio Hub
              </button>
              <a href="#services" onClick={(e) => handleAnchorClick(e, 'services')}>
                Services
              </a>
              <a href="#estimator" onClick={(e) => handleAnchorClick(e, 'estimator')}>
                Yard Visualizer
              </a>
              <a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>
                Contact
              </a>
              <a
                href="https://github.com/orondee/small-business-websites"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo ↗
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </ViewportFrame>
  );
}
