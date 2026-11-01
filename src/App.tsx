import { RouterProvider, useRouter } from './hooks/useRouter';
import { PortfolioHome } from './pages/PortfolioHome';
import { GreenLinePage } from './pages/GreenLinePage';
import { BrightSidePage } from './pages/BrightSidePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ScrollProgress } from './components/ScrollProgress';

import './styles/base.css';
import './styles/polish.css';
import './styles/portfolio.css';
import './styles/greenline.css';
import './styles/brightside.css';

function MainRouter() {
  const { currentRoute } = useRouter();

  switch (currentRoute) {
    case 'greenline':
      return <GreenLinePage />;
    case 'brightside':
      return <BrightSidePage />;
    case 'portfolio':
      return <PortfolioHome />;
    default:
      return <NotFoundPage />;
  }
}

export function App() {
  return (
    <RouterProvider>
      <ScrollProgress />
      <MainRouter />
    </RouterProvider>
  );
}

export default App;
