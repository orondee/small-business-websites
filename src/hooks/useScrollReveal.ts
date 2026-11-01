import { useEffect } from 'react';

export function useScrollReveal(dependency?: unknown) {
  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -24px 0px',
      }
    );

    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
