import { useState, useId } from 'react';

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  price: number;
  days: number;
}

const AVAILABLE_FEATURES: FeatureOption[] = [
  {
    id: 'calculator',
    name: 'Interactive Instant Price Estimator',
    description: 'Allows homeowners to calculate instant yard/room quotes directly on your website.',
    price: 65,
    days: 2,
  },
  {
    id: 'booking',
    name: 'Frictionless Mobile Inquiry Flow',
    description: 'Multi-step validation, zero dead ends, with live customer estimate preview.',
    price: 45,
    days: 1,
  },
  {
    id: 'matrix',
    name: 'Side-by-Side Service Comparison Matrix',
    description: 'Clarifies standard vs deep service packages to prevent customer price confusion.',
    price: 35,
    days: 1,
  },
  {
    id: 'seo',
    name: 'Local SEO & Neighborhood Schema',
    description: 'Structured data for towns, postal codes, and service radius to dominate local search.',
    price: 55,
    days: 1,
  },
  {
    id: 'branding',
    name: 'Editorial Photography Art Direction',
    description: 'Bespoke image curation, typography pairing, and tone of voice design.',
    price: 60,
    days: 2,
  },
];

const BUSINESS_TYPES = [
  { id: 'lawn', label: 'Lawn Care & Landscaping' },
  { id: 'cleaning', label: 'Residential Home Cleaning' },
  { id: 'trades', label: 'Plumbing, HVAC & Electrical' },
  { id: 'contractor', label: 'General Contractor / Remodeling' },
  { id: 'other', label: 'Boutique Local Practice' },
];

export function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState('lawn');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'calculator',
    'booking',
    'seo',
  ]);
  const [isFastTrack, setIsFastTrack] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [briefGenerated, setBriefGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nameInputId = useId();
  const emailInputId = useId();

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base website fee: $290 (responsive design, custom styling, mobile optimization, launch ready)
  const basePrice = 290;
  const baseDays = 7;

  const featuresPrice = selectedFeatures.reduce((acc, featId) => {
    const feat = AVAILABLE_FEATURES.find((f) => f.id === featId);
    return acc + (feat ? feat.price : 0);
  }, 0);

  const featuresDays = selectedFeatures.reduce((acc, featId) => {
    const feat = AVAILABLE_FEATURES.find((f) => f.id === featId);
    return acc + (feat ? feat.days : 0);
  }, 0);

  const subtotal = basePrice + featuresPrice;
  const totalPrice = isFastTrack ? subtotal + 50 : subtotal;
  const totalDays = isFastTrack
    ? Math.max(5, Math.round((baseDays + featuresDays) * 0.6))
    : baseDays + featuresDays;

  const handleGenerateBrief = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !contactEmail.trim()) {
      setErrorMsg('Please enter your business name and email address to generate the brief.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    setErrorMsg('');
    setBriefGenerated(true);
  };

  const getBriefText = () => {
    const typeLabel = BUSINESS_TYPES.find((b) => b.id === selectedType)?.label;
    const feats = selectedFeatures
      .map((id) => `  - ${AVAILABLE_FEATURES.find((f) => f.id === id)?.name}`)
      .join('\n');

    return `PROJECT BRIEF: ${businessName}
Business Type: ${typeLabel}
Contact: ${contactEmail}
Estimated Investment: $${totalPrice.toLocaleString()} USD
Target Launch: ~${totalDays} business days (${isFastTrack ? 'Priority Fast-Track' : 'Standard Delivery'})

Selected Digital Capabilities:
${feats}

Included Standards:
  - 100% Handcrafted Responsive Architecture (Zero template bloat)
  - Fast Mobile Load Performance
  - Accessible Navigation & Clean Hierarchy
  - Semantic Local Search Metadata`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getBriefText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="section shell" id="estimator" aria-labelledby="estimator-title">
      <div style={{ maxWidth: '780px', marginBottom: '40px' }}>
        <p className="eyebrow">Interactive Scope Configurator</p>
        <h2 className="display" id="estimator-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)' }}>
          Transparent planning. Accessible local pricing.
        </h2>
        <p className="muted" style={{ marginTop: '16px', fontSize: '1.1rem', lineHeight: '1.7' }}>
          Select the features your service business needs to calculate an estimated scope, launch
          timeline, and transparent pricing.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.9fr)',
          gap: '40px',
          alignItems: 'start',
        }}
        className="estimator-grid"
      >
        {/* Left Column: Configuration Controls */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* Step 1: Business Category */}
          <div style={{ marginBottom: '32px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}
            >
              Step 1: Your Business Vertical
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {BUSINESS_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '999px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--primary)' : '1px solid var(--line)',
                      background: isSelected ? 'var(--primary)' : 'var(--card)',
                      color: isSelected ? 'var(--on-primary)' : 'var(--fg)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Capabilities & Features */}
          <div style={{ marginBottom: '32px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}
            >
              Step 2: Capabilities &amp; Add-Ons
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {AVAILABLE_FEATURES.map((feat) => {
                const isChecked = selectedFeatures.includes(feat.id);
                return (
                  <label
                    key={feat.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '16px',
                      border: isChecked ? '1px solid var(--accent)' : '1px solid var(--line)',
                      background: isChecked ? 'var(--soft)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFeature(feat.id)}
                      style={{
                        marginTop: '4px',
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--accent)',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <strong style={{ fontSize: '0.94rem', color: 'var(--fg)' }}>
                          {feat.name}
                        </strong>
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--primary)',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          +${feat.price}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--muted)',
                          marginTop: '3px',
                          lineHeight: '1.5',
                        }}
                      >
                        {feat.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: '12px',
              }}
            >
              Step 3: Timeline Urgency
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsFastTrack(false)}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: !isFastTrack ? '2px solid var(--primary)' : '1px solid var(--line)',
                  background: !isFastTrack ? 'var(--soft)' : 'var(--card)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.92rem' }}>Standard Delivery</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                  Normal pacing (~{baseDays + featuresDays} days)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsFastTrack(true)}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  border: isFastTrack ? '2px solid var(--accent)' : '1px solid var(--line)',
                  background: isFastTrack ? 'var(--soft)' : 'var(--card)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.92rem' }}>Priority Fast-Track</strong>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                    }}
                  >
                    +$50
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                  Rapid turnaround (~{Math.max(5, Math.round((baseDays + featuresDays) * 0.6))} days)
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Investment Summary */}
        <div
          style={{
            position: 'sticky',
            top: '84px',
            background: 'var(--surface)',
            color: 'var(--on-surface)',
            borderRadius: '24px',
            padding: '36px 30px',
            boxShadow: 'var(--shadow-lift)',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              marginBottom: '10px',
            }}
          >
            Estimated Investment
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 3.4rem)',
                fontWeight: 400,
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              ${totalPrice.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)' }}>
              USD · complete project setup
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 0',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              margin: '18px 0 24px',
              fontSize: '0.88rem',
            }}
          >
            <div>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
                Estimated Timeline
              </span>
              <strong style={{ fontVariantNumeric: 'tabular-nums' }}>
                ~{totalDays} Business Days
              </strong>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
            <div>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
                Revision Rounds
              </span>
              <strong>2 Included</strong>
            </div>
          </div>

          {/* Deliverables summary */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '8px',
              }}
            >
              Included In This Configuration:
            </span>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 16px',
                fontSize: '0.85rem',
                lineHeight: '1.7',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              <li>Multi-page responsive web layout (Starting at $290)</li>
              <li>Engineered mobile performance &amp; touch optimization</li>
              {selectedFeatures.map((fId) => (
                <li key={fId}>{AVAILABLE_FEATURES.find((f) => f.id === fId)?.name}</li>
              ))}
              <li>Cross-browser testing &amp; launch support</li>
            </ul>
          </div>

          {/* Form to generate brief */}
          {!briefGenerated ? (
            <form onSubmit={handleGenerateBrief}>
              <div style={{ marginBottom: '14px' }}>
                <label
                  htmlFor={nameInputId}
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '4px',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  Your Business Name
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  placeholder="e.g. Oakridge Landscape & Design"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor={emailInputId}
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '4px',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  Your Email
                </label>
                <input
                  id={emailInputId}
                  type="email"
                  placeholder="name@business.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                  }}
                />
              </div>

              {errorMsg && (
                <p
                  style={{
                    color: '#fca5a5',
                    fontSize: '0.82rem',
                    marginBottom: '12px',
                    lineHeight: '1.4',
                  }}
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-accent"
                style={{ width: '100%', fontSize: '0.9rem' }}
              >
                Generate Project Brief →
              </button>
            </form>
          ) : (
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '14px',
                padding: '18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>
                  ✓ Project Brief Ready
                </strong>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: copied ? 'var(--ok)' : 'transparent',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>

              <pre
                style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: '14px',
                }}
              >
                {getBriefText()}
              </pre>

              {!submitted ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.88rem' }}
                  onClick={() => setSubmitted(true)}
                >
                  Confirm &amp; Request Discovery Call
                </button>
              ) : (
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>
                    Consultation request recorded!
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                    (Demo mode: In production, this emails the studio team with your brief.)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
