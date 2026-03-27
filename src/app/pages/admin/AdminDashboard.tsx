import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';

interface Stats {
  newsCount: number;
}

export function AdminDashboard() {
  const { profile, user, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats>({ newsCount: 0 });

  useEffect(() => {
    if (isAdmin) {
      supabase.from('news').select('id', { count: 'exact', head: true })
        .then(({ count }) => setStats({ newsCount: count ?? 0 }));
    }
  }, [isAdmin]);

  return (
    <div className="p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#e8e8ea]">
          Welcome back, {profile?.full_name ?? user?.email} 👋
        </h1>
        <p className="text-[#9ca3af] mt-1">
          {isAdmin ? 'You have full admin access.' : 'Player panel — limited access.'}
        </p>
      </div>

      {/* Stats (admin only) */}
      {isAdmin && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'News Posts', value: stats.newsCount, icon: '📰', link: '/admin/news' },
            { label: 'Pages Managed', value: 3, icon: '📄', link: '/admin/how-to-join' },
          ].map(stat => (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-[#13131a] border border-white/10 rounded-xl p-5 hover:border-[#10b981]/40 transition-colors group"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#e8e8ea] group-hover:text-[#10b981] transition-colors">{stat.value}</div>
              <div className="text-xs text-[#9ca3af] mt-1">{stat.label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-[#13131a] border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/profile" className="bg-[#1a1a2e] hover:bg-[#2d2d3e] text-[#e8e8ea] text-sm font-medium px-4 py-2 rounded-lg border border-white/10 transition-colors">
            ⚙️ Edit My Profile
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin/news" className="bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] text-sm font-medium px-4 py-2 rounded-lg border border-[#10b981]/30 transition-colors">
                ✚ New News Post
              </Link>
              <Link to="/admin/how-to-join" className="bg-[#1a1a2e] hover:bg-[#2d2d3e] text-[#e8e8ea] text-sm font-medium px-4 py-2 rounded-lg border border-white/10 transition-colors">
                ✏️ Edit How to Join
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Player info card */}
      {profile && (
        <div className="bg-[#13131a] border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wide mb-4">Your Player Card</h2>
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar_url ?? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.email}`}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-[#10b981]/40"
            />
            <div>
              <p className="font-bold text-[#e8e8ea]">{profile.full_name}</p>
              {profile.mc_username && <p className="text-sm text-[#9ca3af]">🎮 {profile.mc_username}</p>}
              {profile.bio && <p className="text-sm text-[#9ca3af] mt-1 max-w-md">{profile.bio}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
