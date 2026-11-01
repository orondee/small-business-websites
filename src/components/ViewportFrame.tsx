import { ReactNode } from 'react';
import { useRouter } from '../hooks/useRouter';

interface ViewportFrameProps {
  children: ReactNode;
  conceptName: string;
}

export function ViewportFrame({ children, conceptName }: ViewportFrameProps) {
  const { viewportMode, setViewportMode, navigate } = useRouter();

  if (viewportMode === 'full') {
    return <>{children}</>;
  }

  const isMobile = viewportMode === 'mobile';
  const targetWidth = isMobile ? '390px' : '768px';
  const targetHeight = isMobile ? '844px' : '960px';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#121415',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* Device Toolbar */}
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          fontSize: '0.86rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#d4d4d8',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to Studio Hub
          </button>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
          <span style={{ fontWeight: 600, color: '#f4f4f5' }}>{conceptName}</span>
        </div>

        {/* Viewport Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setViewportMode('full')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            Full View
          </button>
          <button
            type="button"
            onClick={() => setViewportMode('tablet')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: viewportMode === 'tablet' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            Tablet (768px)
          </button>
          <button
            type="button"
            onClick={() => setViewportMode('mobile')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: viewportMode === 'mobile' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            Phone (390px)
          </button>
        </div>
      </div>

      {/* Simulated Device Chassis */}
      <div
        style={{
          width: targetWidth,
          maxWidth: '100%',
          height: targetHeight,
          background: '#ffffff',
          borderRadius: isMobile ? '44px' : '28px',
          border: '12px solid #27272a',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {isMobile && (
          <div
            style={{
              position: 'sticky',
              top: 0,
              left: 0,
              right: 0,
              height: '24px',
              background: '#09090b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
            }}
          >
            <div
              style={{
                width: '110px',
                height: '14px',
                background: '#27272a',
                borderRadius: '999px',
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
