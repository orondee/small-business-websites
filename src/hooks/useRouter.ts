import { useState, useEffect, useCallback, createContext, useContext, ReactNode, createElement } from 'react';

export type RoutePath = 'portfolio' | 'greenline' | 'brightside' | 'not-found';
export type ViewportMode = 'full' | 'tablet' | 'mobile';

export const LIVE_LINKS = {
  githubPagesHub: 'https://orondee.github.io/small-business-websites/',
  githubPagesGreenLine: 'https://orondee.github.io/small-business-websites/#/greenline-lawn-care',
  githubPagesBrightSide: 'https://orondee.github.io/small-business-websites/#/brightside-cleaning',
  githubRepo: 'https://github.com/orondee/small-business-websites',
};

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.warn('Failed to copy to clipboard', err);
    return false;
  }
}

interface RouterContextType {
  currentRoute: RoutePath;
  navigate: (to: string) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  currentYear: number;
  basePath: string;
}

const RouterContext = createContext<RouterContextType | null>(null);

function getBasePath(): string {
  if (typeof window === 'undefined') return '';
  const pathname = window.location.pathname.toLowerCase();
  if (pathname.includes('/small-business-websites')) {
    return '/small-business-websites';
  }
  return '';
}

function resolvePath(pathname: string, hash: string, search: string): RoutePath {
  const cleanPath = pathname.toLowerCase().replace(/\/index\.html$/, '').replace(/\/$/, '');
  const cleanHash = hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');

  // Check query parameter redirect (SPA redirect helper e.g. ?p=/greenline-lawn-care)
  if (search) {
    const params = new URLSearchParams(search);
    const p = params.get('p') || params.get('route');
    if (p) {
      const cleanP = p.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
      if (cleanP === 'greenline-lawn-care' || cleanP.startsWith('greenline')) return 'greenline';
      if (cleanP === 'brightside-cleaning' || cleanP.startsWith('brightside')) return 'brightside';
      if (cleanP === '' || cleanP === 'portfolio') return 'portfolio';
    }
  }

  // 1. Check Hash routing (primary for GitHub Pages static hosting resilience)
  if (cleanHash === 'greenline-lawn-care' || cleanHash.startsWith('greenline')) {
    return 'greenline';
  }
  if (cleanHash === 'brightside-cleaning' || cleanHash.startsWith('brightside')) {
    return 'brightside';
  }

  // 2. Check Path routing
  if (
    cleanPath === '' ||
    cleanPath === '/' ||
    cleanPath === '/small-business-websites' ||
    cleanPath.endsWith('/small-business-websites')
  ) {
    return 'portfolio';
  }
  if (cleanPath.endsWith('/greenline-lawn-care') || cleanPath === '/greenline-lawn-care') {
    return 'greenline';
  }
  if (cleanPath.endsWith('/brightside-cleaning') || cleanPath === '/brightside-cleaning') {
    return 'brightside';
  }

  // In-page section anchors when on root
  if (cleanHash && !cleanHash.includes('/')) {
    return 'portfolio';
  }

  return 'portfolio'; // Default gracefully to portfolio hub instead of 404 to avoid jarring visitors
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() =>
    resolvePath(window.location.pathname, window.location.hash, window.location.search)
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('full');
  const basePath = getBasePath();

  const updateRoute = useCallback(() => {
    const route = resolvePath(
      window.location.pathname,
      window.location.hash,
      window.location.search
    );
    setCurrentRoute(route);

    // Check if there is an in-page anchor (e.g. #services, #estimator)
    const hash = window.location.hash;
    if (hash && !hash.startsWith('#/')) {
      const anchorId = hash.replace(/^#/, '');
      const target = document.getElementById(anchorId);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', updateRoute);
    window.addEventListener('hashchange', updateRoute);
    return () => {
      window.removeEventListener('popstate', updateRoute);
      window.removeEventListener('hashchange', updateRoute);
    };
  }, [updateRoute]);

  const navigate = useCallback((to: string) => {
    // In-page anchor link
    if (to.startsWith('#')) {
      const targetId = to.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // External link
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    // Route transitions: Normalize to robust hash routes for GitHub Pages compatibility
    const cleanTo = to.toLowerCase().trim();

    if (cleanTo === '/' || cleanTo === 'portfolio' || cleanTo === '/portfolio' || cleanTo === '') {
      setCurrentRoute('portfolio');
      if (window.location.pathname.includes('/small-business-websites')) {
        history.pushState(null, '', `${basePath}/#/`);
      } else {
        history.pushState(null, '', '#/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (cleanTo === 'greenline' || cleanTo === '/greenline-lawn-care' || cleanTo.includes('greenline')) {
      setCurrentRoute('greenline');
      if (window.location.pathname.includes('/small-business-websites')) {
        history.pushState(null, '', `${basePath}/#/greenline-lawn-care`);
      } else {
        history.pushState(null, '', '#/greenline-lawn-care');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (cleanTo === 'brightside' || cleanTo === '/brightside-cleaning' || cleanTo.includes('brightside')) {
      setCurrentRoute('brightside');
      if (window.location.pathname.includes('/small-business-websites')) {
        history.pushState(null, '', `${basePath}/#/brightside-cleaning`);
      } else {
        history.pushState(null, '', '#/brightside-cleaning');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Fallback standard pushState
    history.pushState(null, '', to);
    updateRoute();
  }, [basePath, updateRoute]);

  const currentYear = new Date().getFullYear();

  return createElement(
    RouterContext.Provider,
    { value: { currentRoute, navigate, viewportMode, setViewportMode, currentYear, basePath } },
    children
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
