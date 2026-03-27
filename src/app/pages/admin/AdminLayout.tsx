import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext';

const adminNavItems = [
  { path: '/admin', label: '📊 Dashboard', end: true },
  { path: '/admin/news', label: '📰 News' },
  { path: '/admin/how-to-join', label: '🗺️ How to Join' },
  { path: '/admin/about', label: '👥 About' },
  { path: '/admin/wiki', label: '📖 Plugin Wiki' },
];

const userNavItems = [
  { path: '/dashboard', label: '📊 Dashboard', end: true },
];

export function AdminLayout() {
  const { profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0f0f16] border-r border-white/10 flex flex-col">
        <div className="px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#10b981] flex items-center justify-center rounded text-sm">⛏️</div>
            <span className="text-sm font-bold text-[#e8e8ea]">
              {isAdmin ? 'Admin Panel' : 'Player Panel'}
            </span>
          </div>
          {profile && (
            <p className="text-xs text-[#9ca3af] mt-2 truncate">{profile.full_name ?? 'User'}</p>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-[#10b981]/20 text-[#10b981] font-medium'
                    : 'text-[#9ca3af] hover:bg-[#1a1a2e] hover:text-[#e8e8ea]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => navigate('/profile')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#9ca3af] hover:bg-[#1a1a2e] hover:text-[#e8e8ea] transition-colors"
          >
            ⚙️ My Profile
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#9ca3af] hover:bg-[#1a1a2e] hover:text-[#e8e8ea] transition-colors"
          >
            🏠 Back to Site
          </button>
          <button
            onClick={async () => { await signOut(); navigate('/'); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#ef4444]/70 hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
