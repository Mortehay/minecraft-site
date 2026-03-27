import { createBrowserRouter } from 'react-router';

import { Layout }           from './components/Layout';
import { ProtectedRoute }   from './components/ProtectedRoute';

// Public pages
import { Home }       from './pages/Home';
import { HowToJoin }  from './pages/HowToJoin';
import { About }      from './pages/About';
import { PluginWiki } from './pages/PluginWiki';
import { News }       from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { NotFound }   from './pages/NotFound';
import { SignIn }     from './pages/SignIn';

// Auth-required pages
import { UserProfile } from './pages/UserProfile';

// Admin / Player panel
import { AdminLayout }        from './pages/admin/AdminLayout';
import { AdminDashboard }     from './pages/admin/AdminDashboard';
import { NewsAdmin }          from './pages/admin/NewsAdmin';
import { PageContentAdmin }   from './pages/admin/PageContentAdmin';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true,        Component: Home },
      { path: 'how-to-join', Component: HowToJoin },
      { path: 'about',       Component: About },
      { path: 'wiki',        Component: PluginWiki },
      { path: 'news',        Component: News },
      { path: 'news/:id',    Component: NewsDetail },
      { path: 'signin',      Component: SignIn },
      {
        path: 'profile',
        element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
      },
      { path: '*', Component: NotFound },
    ],
  },

  // ── Authenticated panel (player + admin) ─────────────────────────
  {
    path: '/dashboard',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, Component: AdminDashboard },
    ],
  },

  // ── Admin-only panel ─────────────────────────────────────────────
  {
    path: '/admin',
    element: <ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true,                    Component: AdminDashboard },
      { path: 'news',                   Component: NewsAdmin },
      { path: ':slug',                  Component: PageContentAdmin },
    ],
  },
]);