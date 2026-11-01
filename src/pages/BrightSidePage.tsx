import { useState, useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ViewportFrame } from '../components/ViewportFrame';

interface CleanPackage {
  id: string;
  num: string;
  name: string;
  badge: string;
  desc: string;
  basePrice: number;
  perRoomRate: number;
  durationBase: number;
  inclusions: string[];
}

const PACKAGES: CleanPackage[] = [
  {
    id: 'standard',
    num: '01',
    name: 'Maintenance Care',
    badge: 'Recurring Favorite',
    desc: 'Regular attention for lived-in homes: sanitizing, HEPA filtration vacuuming, and surface polishing.',
    basePrice: 120,
    perRoomRate: 18,
    durationBase: 2.0,
    inclusions: [
      'High-touch kitchen & bathroom sanitizing',
      'HEPA microfiltration vacuum & damp mop',
      'Dusting lamps, tables, mirrors & electronics',
      'Fresh linen change & trash removal',
    ],
  },
  {
    id: 'deep',
    num: '02',
    name: 'Deep Restoration',
    badge: 'Seasonal Refresh',
    desc: 'Intensive scrubbing of hard-to-reach areas, baseboard detailing, descaling, and neglected corners.',
    basePrice: 180,
    perRoomRate: 26,
    durationBase: 3.2,
    inclusions: [
      'All Maintenance Care inclusions',
      'Baseboards, door frames & trim scrubbed',
      'Behind & under movable furniture',
      'Bathroom tile grout descaling & air vents',
    ],
  },
  {
    id: 'move',
    num: '03',
    name: 'Move-In / Out Reset',
    badge: 'Empty-Home Turn',
    desc: 'Sterile reset for vacant homes before unpacking or after moving out: every cupboard and closet.',
    basePrice: 240,
    perRoomRate: 34,
    durationBase: 4.5,
    inclusions: [
      'Every cabinet, drawer & shelf interior',
      'Closet shelving & wardrobe wipe-down',
      'Inside appliance deep degreasing',
      '100% turnkey ready to unpack',
    ],
  },
];

export function BrightSidePage() {
  const { navigate, viewportMode, setViewportMode, currentYear } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Estimator state
  const [selectedPackageId, setSelectedPackageId] = useState('standard');
  const [bedroomCount, setBedroomCount] = useState(2);
  const [bathroomCount, setBathroomCount] = useState(2);
  const [cadence, setCadence] = useState<'onetime' | 'biweekly' | 'monthly'>('biweekly');
  const [addonFridge, setAddonFridge] = useState(false);
  const [addonOven, setAddonOven] = useState(false);
  const [addonWindows, setAddonWindows] = useState(false);

  // Booking inquiry state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedPreview, setSubmittedPreview] = useState<{
    name: string;
    email: string;
    phone: string;
    quoteSummary: string;
    notes: string;
  } | null>(null);

  useScrollReveal();

  useEffect(() => {
    document.title = 'BrightSide Home Cleaning — Come Home to Clean and Calm';
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
  const currentPkg = PACKAGES.find((p) => p.id === selectedPackageId) || PACKAGES[0];
  const roomCost = (bedroomCount + bathroomCount) * currentPkg.perRoomRate;
  const addonsCost = (addonFridge ? 35 : 0) + (addonOven ? 45 : 0) + (addonWindows ? 40 : 0);
  const rawSubtotal = currentPkg.basePrice + roomCost + addonsCost;

  // Cadence discount
  const discountMultiplier = cadence === 'biweekly' ? 0.85 : cadence === 'monthly' ? 0.90 : 1.0;
  const finalPrice = Math.round(rawSubtotal * discountMultiplier);
  const estHours = (currentPkg.durationBase + (bedroomCount * 0.3) + (bathroomCount * 0.4)).toFixed(1);

  const transferToBooking = () => {
    const cadenceLabel =
      cadence === 'biweekly'
        ? 'Bi-Weekly (15% Courtesy Rate)'
        : cadence === 'monthly'
        ? 'Monthly (10% Courtesy Rate)'
        : 'One-Time Clean';

    const selectedAddons = [
      addonFridge && 'Inside Fridge',
      addonOven && 'Inside Oven',
      addonWindows && 'Interior Windows',
    ].filter(Boolean).join(', ');

    const summaryText = `CARE LEDGER ESTIMATE:
- Package: ${currentPkg.name}
- Layout: ${bedroomCount} Bed, ${bathroomCount} Bath
- Cadence: ${cadenceLabel}
- Add-Ons: ${selectedAddons || 'None'}
- Estimated Rate: ~$${finalPrice} (~${estHours} hours by 2 dedicated specialists)

Please check calendar availability for an initial walkthrough or first clean.`;

    setNotes(summaryText);

    const detailsElem = document.getElementById('details');
    if (detailsElem) {
      detailsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Please provide your name.';
    if (!email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) newErrors.phone = 'Please provide a contact phone number.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedPreview({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        quoteSummary: `$${finalPrice} (${currentPkg.name}, ~${estHours} hrs)`,
        notes: notes.trim() || 'No additional notes provided.',
      });
      setErrors({});
    }
  };

  const handleResetBooking = () => {
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setSubmittedPreview(null);
    setErrors({});
  };

  return (
    <ViewportFrame conceptName="BrightSide Home Cleaning">
      <div className="brightside-theme">
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        {/* Demo Notice & Viewport Switcher Bar */}
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
              <span>Portfolio Concept · BrightSide Home Cleaning</span>
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f6c3a6',
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

        {/* Header with 3-Zone Contract */}
        <header className="site-header">
          <div className="shell">
            <a
              className="brand"
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="BrightSide, back to top"
            >
              BrightSide<span className="dot">.</span>
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="brightside-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
            </button>

            <nav
              className={`site-nav ${menuOpen ? 'is-open' : ''}`}
              id="brightside-navigation"
              aria-label="Main navigation"
            >
              <a href="#services" onClick={(e) => handleAnchorClick(e, 'services')}>
                Services
              </a>
              <a href="#ledger" onClick={(e) => handleAnchorClick(e, 'ledger')}>
                Care Ledger &amp; Rates
              </a>
              <a href="#standards" onClick={(e) => handleAnchorClick(e, 'standards')}>
                Our Standards
              </a>
              <a href="#details" onClick={(e) => handleAnchorClick(e, 'details')}>
                Book Consultation
              </a>
              <a
                className="btn btn-accent btn-sm"
                href="#ledger"
                onClick={(e) => handleAnchorClick(e, 'ledger')}
              >
                Estimate Your Clean
              </a>
            </nav>
          </div>
        </header>

        <main id="main">
          {/* Hero Section */}
          <section className="brightside-hero" aria-labelledby="hero-title">
            <div className="shell">
              <div className="rise reveal">
                <p className="eyebrow">Home care, with a lighter touch</p>
                <h1 id="hero-title" style={{ textWrap: 'balance' }}>
                  Come home to clean, calm, and time well spent.
                </h1>
                <p className="lead reveal">
                  A tidy space makes everyday life feel lighter. Plant-based non-toxic botanicals,
                  dedicated two-person teams, and meticulous attention to every corner of your home.
                </p>
                <div className="btn-row reveal">
                  <a
                    className="btn btn-primary"
                    href="#ledger"
                    onClick={(e) => handleAnchorClick(e, 'ledger')}
                  >
                    Calculate Your Care Routine →
                  </a>
                  <a
                    className="text-link"
                    href="#standards"
                    onClick={(e) => handleAnchorClick(e, 'standards')}
                  >
                    The BrightSide Standard
                  </a>
                </div>
              </div>

              <div className="hero-media reveal">
                <img
                  src="/src/assets/images/brightside_serene_home_1793511623291.jpg"
                  alt="Bright and airy modern living room with soft linen textures and clean wooden floors"
                  width={1400}
                  height={1120}
                  referrerPolicy="no-referrer"
                />
                <div className="hero-tag">
                  <b>Fresh Home</b>
                  <small>100% Non-Toxic &amp; Pet-Safe Botanicals</small>
                </div>
              </div>
            </div>
          </section>

          {/* UNIQUE PRICING SECTION: Editorial Room & Linen Ledger */}
          <section
            className="section shell reveal"
            id="ledger"
            aria-labelledby="ledger-title"
          >
            <div style={{ maxWidth: '720px', marginBottom: '40px' }}>
              <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                The Care Ledger &amp; Transparent Pricing
              </p>
              <h2 id="ledger-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)' }}>
                A bespoke schedule for your home.
              </h2>
              <p className="muted" style={{ marginTop: '12px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Select your home scale and clean tier. We charge by the home scope, not by arbitrary
                hourly meters.
              </p>
            </div>

            {/* Step 1: 3-Package Side-by-Side Architectural Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '36px',
              }}
            >
              {PACKAGES.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    style={{
                      background: isSelected ? 'var(--card)' : 'var(--soft)',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--line)',
                      borderRadius: '24px',
                      padding: '30px 24px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      boxShadow: isSelected ? 'var(--shadow-lift)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.8rem',
                          color: isSelected ? 'var(--accent)' : 'var(--muted)',
                        }}
                      >
                        {pkg.num}
                      </span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--muted)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.4rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        marginBottom: '8px',
                        color: 'var(--fg)',
                      }}
                    >
                      {pkg.name}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                      {pkg.desc}
                    </p>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--muted)',
                          marginBottom: '8px',
                        }}
                      >
                        Key Inclusions:
                      </span>
                      <ul
                        style={{
                          margin: 0,
                          padding: '0 0 0 16px',
                          fontSize: '0.8rem',
                          lineHeight: '1.7',
                          color: 'var(--fg)',
                        }}
                      >
                        {pkg.inclusions.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>

                      <div
                        style={{
                          marginTop: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)' }}>
                          Base Tier Rate
                        </span>
                        <strong
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.4rem',
                            color: isSelected ? 'var(--accent)' : 'var(--fg)',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          From ${pkg.basePrice}
                        </strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Room Steppers & Frequency Cadence Ledger */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
                gap: '36px',
                alignItems: 'start',
              }}
              className="calculator-grid"
            >
              {/* Stepper controls */}
              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: '24px',
                  padding: '32px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    fontSize: '0.94rem',
                    color: 'var(--fg)',
                    marginBottom: '18px',
                  }}
                >
                  Configure Home Architecture
                </strong>

                {/* Bedrooms & Bathrooms Steppers */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    marginBottom: '28px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--muted)',
                        marginBottom: '8px',
                      }}
                    >
                      Bedrooms: {bedroomCount}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setBedroomCount(count)}
                          style={{
                            flex: 1,
                            padding: '10px 0',
                            borderRadius: '12px',
                            border: bedroomCount === count ? '2px solid var(--primary)' : '1px solid var(--line)',
                            background: bedroomCount === count ? 'var(--primary)' : 'var(--card)',
                            color: bedroomCount === count ? 'var(--on-primary)' : 'var(--fg)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                          }}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--muted)',
                        marginBottom: '8px',
                      }}
                    >
                      Bathrooms: {bathroomCount}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setBathroomCount(count)}
                          style={{
                            flex: 1,
                            padding: '10px 0',
                            borderRadius: '12px',
                            border: bathroomCount === count ? '2px solid var(--primary)' : '1px solid var(--line)',
                            background: bathroomCount === count ? 'var(--primary)' : 'var(--card)',
                            color: bathroomCount === count ? 'var(--on-primary)' : 'var(--fg)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                          }}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cadence Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--muted)',
                      marginBottom: '10px',
                    }}
                  >
                    Routine Care Cadence
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setCadence('onetime')}
                      style={{
                        padding: '12px',
                        borderRadius: '14px',
                        border: cadence === 'onetime' ? '2px solid var(--accent)' : '1px solid var(--line)',
                        background: cadence === 'onetime' ? 'var(--soft)' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.85rem' }}>One-Time</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Standard rate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCadence('biweekly')}
                      style={{
                        padding: '12px',
                        borderRadius: '14px',
                        border: cadence === 'biweekly' ? '2px solid var(--accent)' : '1px solid var(--line)',
                        background: cadence === 'biweekly' ? 'var(--soft)' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.85rem' }}>Bi-Weekly</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700 }}>15% Courtesy</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCadence('monthly')}
                      style={{
                        padding: '12px',
                        borderRadius: '14px',
                        border: cadence === 'monthly' ? '2px solid var(--accent)' : '1px solid var(--line)',
                        background: cadence === 'monthly' ? 'var(--soft)' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.85rem' }}>Monthly</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700 }}>10% Courtesy</span>
                    </button>
                  </div>
                </div>

                {/* Addons */}
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Specialist Kitchen &amp; Glass Detailing
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                        background: addonFridge ? 'var(--soft)' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '0.86rem',
                      }}
                    >
                      <span>Inside Refrigerator Wash &amp; Shelf Sanitize</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--muted)' }}>+$35</span>
                        <input
                          type="checkbox"
                          checked={addonFridge}
                          onChange={(e) => setAddonFridge(e.target.checked)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                      </div>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                        background: addonOven ? 'var(--soft)' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '0.86rem',
                      }}
                    >
                      <span>Inside Oven Degreasing &amp; Glass Clean</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--muted)' }}>+$45</span>
                        <input
                          type="checkbox"
                          checked={addonOven}
                          onChange={(e) => setAddonOven(e.target.checked)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                      </div>
                    </label>

                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                        background: addonWindows ? 'var(--soft)' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '0.86rem',
                      }}
                    >
                      <span>Interior Window Panes &amp; Sills</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: 'var(--muted)' }}>+$40</span>
                        <input
                          type="checkbox"
                          checked={addonWindows}
                          onChange={(e) => setAddonWindows(e.target.checked)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Output: The Care Ledger Stationery Card */}
              <div
                style={{
                  background: 'var(--surface)',
                  color: 'var(--on-surface)',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  boxShadow: 'var(--shadow-lift)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingBottom: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      letterSpacing: '-0.01em',
                      color: '#f6c3a6',
                    }}
                  >
                    The BrightSide Care Ledger
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Itemized Quote
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
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
                    All-Inclusive Clean Rate
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3.6rem',
                        fontWeight: 400,
                        lineHeight: 1,
                        color: 'var(--on-surface)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      ${finalPrice}
                    </span>
                    <span style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      USD · flat estimate
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.22)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '20px',
                    fontSize: '0.82rem',
                    lineHeight: '1.7',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Selected Routine:</span>
                    <strong>{currentPkg.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Home Scale:</span>
                    <span>{bedroomCount} Bed / {bathroomCount} Bath</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Dedicated Specialists:</span>
                    <span>2-Person Vetted Team</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Expected Duration:</span>
                    <strong style={{ fontVariantNumeric: 'tabular-nums' }}>~{estHours} hours</strong>
                  </div>
                  {cadence !== 'onetime' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f6c3a6' }}>
                      <span>Recurring Courtesy:</span>
                      <span>{cadence === 'biweekly' ? '15% Off Applied' : '10% Off Applied'}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-accent"
                  style={{ width: '100%', fontSize: '0.92rem' }}
                  onClick={transferToBooking}
                >
                  Lock In Care Ledger to Form ↓
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
                  <span>✓ 100% Non-Toxic Botanicals</span>
                  <span>·</span>
                  <span>✓ Free Re-Clean Guarantee</span>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="section shell reveal" id="services" aria-labelledby="services-title">
            <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
              <p className="eyebrow">The Service Menu</p>
              <h2 id="services-title">A little help goes a long way.</h2>
              <p className="muted" style={{ marginTop: '14px', fontSize: '1.1rem' }}>
                Three clear, predictable service choices. Each executed with museum-grade care and
                unscented plant botanicals.
              </p>
            </div>

            <div className="grid-3">
              <article className="card service reveal">
                <div className="card-media">
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80"
                    alt="A dog relaxing in a bright, freshly cleaned living room"
                    width={900}
                    height={675}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card-body">
                  <span className="num">01</span>
                  <h3>Standard Maintenance</h3>
                  <p className="muted">
                    Recurring attention for kitchens, bathrooms, bedrooms, and high-traffic shared
                    spaces.
                  </p>
                  <ul className="checks">
                    <li>Sanitized countertops &amp; sinks</li>
                    <li>HEPA filtration vacuum &amp; damp mop</li>
                    <li>Tidy beds, linens &amp; shared spaces</li>
                    <li>Trash &amp; recycling removal</li>
                  </ul>
                </div>
              </article>

              <article className="card service reveal">
                <div className="card-media">
                  <img
                    src="/src/assets/images/brightside_kitchen_clean_1793511624643.jpg"
                    alt="Pristine luxury kitchen with marble island and fresh eucalyptus"
                    width={900}
                    height={675}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card-body">
                  <span className="num">02</span>
                  <h3>Deep Restoration</h3>
                  <p className="muted">
                    Extra time and detail for the often-overlooked corners, baseboards, and surfaces
                    that need TLC.
                  </p>
                  <ul className="checks">
                    <li>Baseboards, door frames &amp; trim</li>
                    <li>Behind &amp; inside key appliance zones</li>
                    <li>Bathroom tile grout &amp; fixture descaling</li>
                    <li>Intensive light fixture &amp; vent dusting</li>
                  </ul>
                </div>
              </article>

              <article className="card service reveal">
                <div className="card-media">
                  <img
                    src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80"
                    alt="A comfortable bedroom with fresh bedding and natural light"
                    width={900}
                    height={675}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="card-body">
                  <span className="num">03</span>
                  <h3>Move-In / Move-Out</h3>
                  <p className="muted">
                    A sterile, fresh start for an empty home before you settle in or after a major move.
                  </p>
                  <ul className="checks">
                    <li>Complete empty-home deep scrub</li>
                    <li>Inside every cabinet, drawer &amp; shelf</li>
                    <li>Closet wipe-downs &amp; baseboard detailing</li>
                    <li>100% ready for unpack &amp; move-in day</li>
                  </ul>
                </div>
              </article>
            </div>
          </section>

          {/* Standards */}
          <section
            className="section section-dark brightside-about reveal"
            id="standards"
            aria-labelledby="standards-title"
          >
            <div className="shell">
              <img
                src="/src/assets/images/brightside_kitchen_clean_1793511624643.jpg"
                alt="Immaculate modern kitchen reflecting warm daylight"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                  The BrightSide Standard
                </p>
                <h2 id="standards-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)' }}>
                  Quiet luxury for real life.
                </h2>
                <p className="big" style={{ lineHeight: '1.7' }}>
                  Most cleaning services rush through with harsh chemical bleaches that linger for
                  days. BrightSide uses botanical, hospital-grade formulas that leave your air fresh,
                  neutral, and completely safe for children and pets.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginTop: '28px',
                    fontSize: '0.88rem',
                  }}
                >
                  <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '14px' }}>
                    <strong style={{ display: 'block', color: 'var(--on-surface)' }}>
                      Dedicated 2-Person Duo
                    </strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                      The same vetted faces visit your home each time.
                    </span>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '14px' }}>
                    <strong style={{ display: 'block', color: 'var(--on-surface)' }}>
                      Fully Insured &amp; Bonded
                    </strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Background-checked, trained, and insured to $2M.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="section shell reveal" id="details" aria-labelledby="details-title">
            <div className="brightside-cta">
              <p className="eyebrow" style={{ color: '#f6c3a6' }}>
                Portfolio Consultation Demo
              </p>
              <h2 id="details-title">Good information is a fresh start.</h2>
              <p>
                In a live business environment, this step connects to a real-time calendar and
                automated booking confirmation. Test the inquiry preview below.
              </p>

              {submittedPreview ? (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '24px',
                    marginTop: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <p style={{ color: '#f6c3a6', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>
                    ✓ Consultation Request Recorded!
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#ffffff', margin: '10px 0 0', lineHeight: '1.6' }}>
                    <strong>Name:</strong> {submittedPreview.name}
                    <br />
                    <strong>Email:</strong> {submittedPreview.email}
                    <br />
                    <strong>Phone:</strong> {submittedPreview.phone}
                    <br />
                    <strong>Estimate:</strong> {submittedPreview.quoteSummary}
                  </p>
                  <pre
                    style={{
                      background: 'rgba(0,0,0,0.2)',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.8)',
                      whiteSpace: 'pre-wrap',
                      marginTop: '12px',
                    }}
                  >
                    {submittedPreview.notes}
                  </pre>
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ color: '#ffffff', borderColor: '#ffffff', marginTop: '14px' }}
                    onClick={handleResetBooking}
                  >
                    Submit Another Consultation Request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleBookingSubmit}
                  style={{
                    marginTop: '28px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  <div>
                    <label
                      htmlFor="client-name"
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '6px',
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.name ? '1px solid #fca5a5' : '1px solid rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                      }}
                    />
                    {errors.name && (
                      <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="client-email"
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '6px',
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      placeholder="eleanor@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.email ? '1px solid #fca5a5' : '1px solid rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                      }}
                    />
                    {errors.email && (
                      <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{errors.email}</span>
                    )}
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label
                      htmlFor="client-phone"
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '6px',
                      }}
                    >
                      Contact Phone Number
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      placeholder="(555) 014-0123"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: errors.phone ? '1px solid #fca5a5' : '1px solid rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                      }}
                    />
                    {errors.phone && (
                      <span style={{ color: '#fca5a5', fontSize: '0.8rem' }}>{errors.phone}</span>
                    )}
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label
                      htmlFor="client-notes"
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                        marginBottom: '6px',
                      }}
                    >
                      Home Requirements &amp; Preferred Schedule
                    </label>
                    <textarea
                      id="client-notes"
                      rows={3}
                      placeholder="Special pet details, preferred weekday or weekend times..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                    <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>
                      Preview Sample Consultation Booking →
                    </button>
                  </div>
                </form>
              )}
            </div>
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
              BrightSide<span className="dot">.</span>
            </a>
            <span>
              Fictional Business Portfolio Demo · © <span>{currentYear}</span> · Photography via
              Unsplash &amp; Studio Archive
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
              <a href="#ledger" onClick={(e) => handleAnchorClick(e, 'ledger')}>
                Care Ledger
              </a>
              <a href="#details" onClick={(e) => handleAnchorClick(e, 'details')}>
                Book Consultation
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </ViewportFrame>
  );
}
