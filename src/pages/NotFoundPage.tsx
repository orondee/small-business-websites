import { useEffect } from 'react';
import { useRouter } from '../hooks/useRouter';

export function NotFoundPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    document.title = 'Page not found | Small Business Sites';
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        background:
          'radial-gradient(120% 80% at 100% 0%, rgb(246 214 190 / 60%), transparent 60%), var(--bg)',
      }}
    >
      <main
        style={{
          width: 'min(620px, 100%)',
          padding: 'clamp(28px, 7vw, 56px)',
          border: '1px solid var(--line)',
          borderRadius: '28px',
          background: 'var(--card)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <a
          className="brand"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          Small Business Sites
        </a>
        <p className="eyebrow" style={{ marginTop: '40px' }}>
          404 · Page not found
        </p>
        <h1 className="display" style={{ marginTop: '10px', fontSize: 'clamp(2.8rem, 9vw, 4.5rem)' }}>
          This page isn’t here.
        </h1>
        <p className="muted" style={{ margin: '16px 0 30px' }}>
          The link may be out of date, or the address may have a typo. Head back to the portfolio or
          visit one of the sample websites.
        </p>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Portfolio home
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/greenline-lawn-care')}
          >
            GreenLine sample
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/brightside-cleaning')}
          >
            BrightSide sample
          </button>
          <a
            className="btn btn-outline"
            href="https://github.com/orondee/small-business-websites"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo ↗
          </a>
        </div>
      </main>
    </div>
  );
}
