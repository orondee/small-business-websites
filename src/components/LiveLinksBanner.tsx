import { useState } from 'react';
import { LIVE_LINKS, copyToClipboard } from '../hooks/useRouter';

export function LiveLinksBanner() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, url: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const links = [
    {
      id: 'hub',
      title: 'Studio Hub (GitHub Pages)',
      url: LIVE_LINKS.githubPagesHub,
      badge: 'Main Portfolio',
      desc: 'The complete studio presentation, design standards, and interactive estimator.',
    },
    {
      id: 'greenline',
      title: 'GreenLine Lawn Care Demo',
      url: LIVE_LINKS.githubPagesGreenLine,
      badge: 'Client Demo 01',
      desc: 'Interactive lot visualizer, weekly/bi-weekly cadence engine, and work order ticket.',
    },
    {
      id: 'brightside',
      title: 'BrightSide Cleaning Demo',
      url: LIVE_LINKS.githubPagesBrightSide,
      badge: 'Client Demo 02',
      desc: 'Editorial room counter, linen ledger, deep clean checklist, and appointment booking.',
    },
    {
      id: 'repo',
      title: 'GitHub Source Repository',
      url: LIVE_LINKS.githubRepo,
      badge: 'Source Code',
      desc: 'Full GitHub repository with automated GitHub Actions Pages deployment workflow.',
    },
  ];

  return (
    <aside
      aria-label="Live Website Deployment & GitHub Pages Links"
      style={{
        background: 'linear-gradient(135deg, #18221c 0%, #22374f 100%)',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="shell"
        style={{
          padding: '24px 20px',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#52b788',
                boxShadow: '0 0 10px #52b788',
              }}
            />
            <strong style={{ fontSize: '1rem', letterSpacing: '0.02em', fontWeight: 700 }}>
              Official Live GitHub Pages URLs &amp; Repository
            </strong>
            <span
              style={{
                fontSize: '0.74rem',
                padding: '2px 8px',
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
            >
              Public Deployment
            </span>
          </div>

          <a
            href={LIVE_LINKS.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#d8f3dc',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'background 0.2s ease',
            }}
          >
            <span>View on GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px',
          }}
        >
          {links.map((item) => {
            const isCopied = copiedKey === item.id;
            return (
              <div
                key={item.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: '#b7e4c7',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.badge}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.5)' }}>
                    github.io
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{item.title}</div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(255, 255, 255, 0.72)',
                    lineHeight: '1.4',
                  }}
                >
                  {item.desc}
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <code
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      background: 'rgba(0, 0, 0, 0.35)',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      overflowX: 'auto',
                      whiteSpace: 'nowrap',
                      color: '#e2eafc',
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.url}
                  </code>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        background: '#52b788',
                        color: '#0d1f12',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Open Link</span>
                      <span aria-hidden="true">↗</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.url)}
                      style={{
                        padding: '6px 12px',
                        background: isCopied ? '#2d6a4f' : 'rgba(255, 255, 255, 0.14)',
                        color: isCopied ? '#d8f3dc' : '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isCopied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Explanation Helper */}
        <div
          style={{
            marginTop: '16px',
            padding: '10px 14px',
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div>
            <strong style={{ color: '#ffffff' }}>Why did github.io show older static pages?</strong>{' '}
            GitHub Pages serves from the commits on your GitHub repository. Once you commit and push the updated files (or run GitHub Actions), GitHub Pages automatically serves this new React experience.
          </div>
          <span style={{ fontSize: '0.76rem', color: '#95d5b2', fontWeight: 600 }}>
            Zero broken links with hash routes (#/greenline-lawn-care)
          </span>
        </div>
      </div>
    </aside>
  );
}
