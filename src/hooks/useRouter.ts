import { useState, useEffect, useCallback, createContext, useContext, ReactNode, createElement } from 'react';

export type RoutePath = 'portfolio' | 'greenline' | 'brightside' | 'not-found';
export type ViewportMode = 'full' | 'tablet' | 'mobile';

interface RouterContextType {
  currentRoute: RoutePath;
  navigate: (to: string) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  currentYear: number;
}

const RouterContext = createContext<RouterContextType | null>(null);

function resolvePath(pathname: string, hash: string): RoutePath {
  const cleanPath = pathname.toLowerCase().replace(/\/index\.html$/, '').replace(/\/$/, '');
  const cleanHash = hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');

  if (cleanHash === 'greenline-lawn-care' || cleanHash.startsWith('greenline')) {
    return 'greenline';
  }
  if (cleanHash === 'brightside-cleaning' || cleanHash.startsWith('brightside')) {
    return 'brightside';
  }

  if (cleanPath === '' || cleanPath === '/' || cleanPath.endsWith('small-business-websites')) {
    return 'portfolio';
  }
  if (cleanPath.endsWith('/greenline-lawn-care') || cleanPath === '/greenline-lawn-care') {
    return 'greenline';
  }
  if (cleanPath.endsWith('/brightside-cleaning') || cleanPath === '/brightside-cleaning') {
    return 'brightside';
  }

  return 'not-found';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() =>
    resolvePath(window.location.pathname, window.location.hash)
  );
  const [viewportMode, setViewportMode] = useState<ViewportMode>('full');

  const updateRoute = useCallback(() => {
    const route = resolvePath(window.location.pathname, window.location.hash);
    setCurrentRoute(route);

    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      const anchorId = window.location.hash.substring(1);
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
    if (to.startsWith('#')) {
      const targetId = to.substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', to);
      }
      return;
    }

    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    history.pushState(null, '', to);
    updateRoute();
  }, [updateRoute]);

  const currentYear = new Date().getFullYear();

  return createElement(
    RouterContext.Provider,
    { value: { currentRoute, navigate, viewportMode, setViewportMode, currentYear } },
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
