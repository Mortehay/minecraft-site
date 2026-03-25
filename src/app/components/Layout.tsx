import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { StatusBar } from './StatusBar';
import { Favicon } from './Favicon';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/how-to-join', label: 'How to Join' },
  { path: '/about', label: 'About' },
  { path: '/wiki', label: 'Plugin Wiki' },
  //{ path: '/dashboard', label: 'Dashboard' }
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e8ea]" style={{ fontFamily: 'var(--font-sans)' }}>


      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#1a1a1f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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

            {/* Nav Links */}
            <div className="flex items-center gap-1">
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
              <StatusBar online={true} ping={12} playerCount="42/100" />
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
