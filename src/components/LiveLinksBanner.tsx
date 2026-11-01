import { useState } from 'react';
import { useRouter, LIVE_LINKS, copyToClipboard } from '../hooks/useRouter';

export function LiveLinksBanner() {
  const { navigate } = useRouter();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSyncGuide, setShowSyncGuide] = useState(false);

  const handleCopy = async (key: string, url: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const gitCommands = `git add .
git commit -m "Fix GitHub Pages white screen: add compiled bundles"
git push origin main`;

  const links = [
    {
      id: 'hub',
      title: 'Studio Hub',
      internalRoute: '/',
      url: LIVE_LINKS.githubPagesHub,
      badge: 'Main Portfolio',
      desc: 'The complete studio presentation, design standards, and interactive scope configurator.',
    },
    {
      id: 'greenline',
      title: 'GreenLine Lawn Care',
      internalRoute: '/greenline-lawn-care',
      url: LIVE_LINKS.githubPagesGreenLine,
      badge: 'Client Demo 01',
      desc: 'Interactive lot visualizer, weekly/bi-weekly cadence engine, and work order ticket.',
    },
    {
      id: 'brightside',
      title: 'BrightSide Cleaning',
      internalRoute: '/brightside-cleaning',
      url: LIVE_LINKS.githubPagesBrightSide,
      badge: 'Client Demo 02',
      desc: 'Editorial room counter, linen ledger, deep clean checklist, and appointment booking.',
    },
    {
      id: 'repo',
      title: 'GitHub Source Repository',
      internalRoute: null,
      url: LIVE_LINKS.githubRepo,
      badge: 'Source Code',
      desc: 'Full GitHub repository with automated GitHub Actions Pages deployment workflow.',
    },
  ];

  return (
    <aside
      aria-label="Live Website Deployment & GitHub Pages Links"
      style={{
        background: 'linear-gradient(135deg, #141c18 0%, #1e2d3d 100%)',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="shell"
        style={{
          padding: '20px',
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
            <strong style={{ fontSize: '0.98rem', letterSpacing: '0.02em', fontWeight: 700 }}>
              Live Deployments &amp; Verified URLs
            </strong>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                background: 'rgba(82, 183, 136, 0.2)',
                color: '#b7e4c7',
                border: '1px solid rgba(82, 183, 136, 0.3)',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
            >
              Ready to View
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setShowSyncGuide(!showSyncGuide)}
              style={{
                background: showSyncGuide ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{showSyncGuide ? 'Hide Push Guide ▲' : 'GitHub Pages Push Guide ▼'}</span>
            </button>

            <a
              href={LIVE_LINKS.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#d8f3dc',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                transition: 'background 0.2s ease',
              }}
            >
              <span>Repository</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
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
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                    {item.internalRoute ? 'In-App & Public' : 'Source'}
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

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {/* Instant In-App Navigation Button */}
                    {item.internalRoute && (
                      <button
                        type="button"
                        onClick={() => navigate(item.internalRoute!)}
                        style={{
                          flex: '1 1 120px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '7px 10px',
                          background: '#52b788',
                          color: '#0d1f12',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <span>Instant In-App View</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    )}

                    {/* External Link Button */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: '1 1 90px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        padding: '7px 10px',
                        background: 'rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <span>github.io ↗</span>
                    </a>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.url)}
                      style={{
                        padding: '7px 12px',
                        background: isCopied ? '#2d6a4f' : 'rgba(255, 255, 255, 0.08)',
                        color: isCopied ? '#d8f3dc' : '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      title="Copy URL to clipboard"
                    >
                      {isCopied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sync Guide & White Screen Fix Explanation */}
        {showSyncGuide && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              background: 'rgba(0, 0, 0, 0.45)',
              borderRadius: '10px',
              border: '1px solid rgba(82, 183, 136, 0.3)',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem' }}>💡</span>
              <strong style={{ color: '#b7e4c7', fontSize: '0.92rem' }}>
                Why Did github.io Show a White Screen? Here is the Instant Fix:
              </strong>
            </div>
            <p style={{ margin: 0, lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.85)' }}>
              GitHub Pages is a static server that serves files directly from your GitHub repository. It previously attempted to load raw TypeScript (<code>main.tsx</code>) instead of bundled JavaScript, resulting in a browser 404 error and white screen.
              <br />
              <strong>We have solved this:</strong> The compiled, production bundle (<code>assets/app.js</code> and <code>assets/app.css</code>) and universal loader are now built directly in your repository.
            </p>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '6px', color: '#ffffff' }}>
                Run these commands in your repository to sync GitHub Pages:
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  color: '#74c0fc',
                  overflowX: 'auto',
                }}
              >
                <span style={{ flex: 1, whiteSpace: 'pre' }}>{gitCommands}</span>
                <button
                  type="button"
                  onClick={() => handleCopy('git-cmd', gitCommands)}
                  style={{
                    marginLeft: '12px',
                    padding: '6px 12px',
                    background: copiedKey === 'git-cmd' ? '#2d6a4f' : '#52b788',
                    color: copiedKey === 'git-cmd' ? '#d8f3dc' : '#0d1f12',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.76rem',
                  }}
                >
                  {copiedKey === 'git-cmd' ? '✓ Copied' : 'Copy Commands'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Helper Strip */}
        <div
          style={{
            marginTop: '14px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.75)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div>
            <strong style={{ color: '#52b788' }}>✓ Zero White Screen Architecture:</strong> All concepts can be explored instantly with the &quot;Instant In-App View&quot; button above, or via direct hash routes.
          </div>
          <span style={{ fontSize: '0.74rem', color: '#95d5b2', fontWeight: 600 }}>
            Standalone bundle: assets/app.js · SPA router active
          </span>
        </div>
      </div>
    </aside>
  );
}

