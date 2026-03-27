import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { StatusBar } from './StatusBar';
import { Favicon } from './Favicon';
import { AuthModal } from './AuthModal';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/how-to-join', label: 'How to Join' },
  { path: '/about', label: 'About' },
  { path: '/wiki', label: 'Plugin Wiki' },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAdmin, signOut, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8ea]" style={{ fontFamily: 'var(--font-sans)' }}>

      {/* Auth modal (portal-style overlay) */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#1a1a1f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Nav Links */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10b981] flex items-center justify-center">
                  <span className="text-2xl">⛏️</span>
                </div>
                <span
                  className="text-xl text-[#10b981] hidden sm:block"
                  style={{ fontFamily: 'var(--font-minecraft)' }}
                >
                  EPIC MC
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#10b981] text-[#0a0a0f]'
                        : 'text-[#9ca3af] hover:bg-[#2d2d36] hover:text-[#e8e8ea]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side: Status + Auth */}
            <div className="flex items-center gap-4">
              <StatusBar online={true} ping={12} playerCount="42/100" />

              <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />

              {/* Auth section */}
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-[#1a1a2e] animate-pulse" />
              ) : user && profile ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center gap-2 hover:bg-[#2d2d36] p-1.5 pr-3 rounded-full transition-colors border border-white/5"
                  >
                    <img
                      src={profile.avatar_url ?? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.email}`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-[#10b981]/30 object-cover"
                    />
                    <span className="text-sm font-medium hidden sm:block">{profile.full_name ?? user.email}</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] hidden sm:block">
                      {profile.role}
                    </span>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <>
                      {/* Click-outside backdrop */}
                      <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-52 bg-[#1a1a1f] border border-white/10 rounded-xl shadow-2xl z-40 py-1.5 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-white/5">
                          <p className="text-sm font-medium text-[#e8e8ea] truncate">{profile.full_name}</p>
                          <p className="text-xs text-[#9ca3af] truncate">{user.email}</p>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#e8e8ea] hover:bg-[#2d2d36] transition-colors"
                        >
                          <span>⚙️</span> My Profile
                        </Link>

                        <Link
                          to={isAdmin ? '/admin' : '/dashboard'}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#e8e8ea] hover:bg-[#2d2d36] transition-colors"
                        >
                          <span>{isAdmin ? '🛡️' : '📊'}</span>
                          {isAdmin ? 'Admin Panel' : 'Dashboard'}
                        </Link>

                        <div className="border-t border-white/5 mt-1 pt-1">
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                          >
                            <span>🚪</span> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-[#10b981] hover:bg-[#059669] text-[#0a0a0f] px-5 py-2 rounded text-sm font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  Login
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1f] border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4
                className="text-lg mb-3 text-[#10b981]"
                style={{ fontFamily: 'var(--font-minecraft)' }}
              >
                Epic MC
              </h4>
              <p className="text-sm text-[#9ca3af]">
                The ultimate Minecraft survival server experience with custom features and a friendly community.
              </p>
            </div>

            <div>
              <h4 className="text-lg mb-3 text-[#e8e8ea]">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Rules</a>
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Forums</a>
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Vote</a>
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Donate</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg mb-3 text-[#e8e8ea]">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Discord</a>
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">YouTube</a>
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Twitter</a>
                <a href="#" className="block text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">Instagram</a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-[#9ca3af]">
            <p>&copy; 2026 Epic MC. All rights reserved. Not affiliated with Mojang Studios.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
