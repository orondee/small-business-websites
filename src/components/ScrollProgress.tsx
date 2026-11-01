import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'var(--accent, #c8623f)',
          transition: 'width 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 0 8px var(--accent, rgba(200, 98, 63, 0.4))',
        }}
      />
    </div>
  );
}
