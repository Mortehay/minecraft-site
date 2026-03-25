import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { HowToJoin } from './pages/HowToJoin';
import { About } from './pages/About';
import { PluginWiki } from './pages/PluginWiki';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'how-to-join', Component: HowToJoin },
      { path: 'about', Component: About },
      { path: 'wiki', Component: PluginWiki },
      { path: 'dashboard', Component: Dashboard },
      { path: '*', Component: NotFound },
    ],
  },
]);