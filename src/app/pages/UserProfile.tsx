import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export function UserProfile() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  // Profile state
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [mcUsername, setMcUsername] = useState(profile?.mc_username ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');
  const [profileMsg, setProfileMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  if (!user || !profile) return null;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const path = `avatars/${user.id}.${ext}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (error) { setProfileMsg({ type: 'err', text: error.message }); return; }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    setAvatarUrl(data.publicUrl);
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg(null);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, mc_username: mcUsername, bio, avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    setProfileMsg(error ? { type: 'err', text: error.message } : { type: 'ok', text: 'Profile saved!' });
    setProfileLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setPwdMsg({ type: 'err', text: 'Passwords do not match.' }); return; }
    setPwdLoading(true);
    setPwdMsg(null);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwdMsg(error ? { type: 'err', text: error.message } : { type: 'ok', text: 'Password updated!' });
    setNewPassword('');
    setConfirmPassword('');
    setPwdLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#e8e8ea]">My Profile</h1>
          <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
            {profile.role}
          </span>
        </div>

        {/* Avatar + Profile Info */}
        <div className="bg-[#13131a] border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wide mb-5">Public Profile</h2>

          <div className="flex items-start gap-5 mb-6">
            <div className="relative group">
              <img
                src={avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.email}`}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-2 border-[#10b981]/40 object-cover"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white font-medium"
              >
                Change
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
            <div>
              <p className="font-medium text-[#e8e8ea]">{profile.full_name ?? user.email}</p>
              <p className="text-sm text-[#9ca3af]">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Display Name</label>
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] focus:outline-none focus:border-[#10b981] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Minecraft Username</label>
                <input
                  value={mcUsername}
                  onChange={e => setMcUsername(e.target.value)}
                  placeholder="e.g. Steve"
                  className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                placeholder="Tell the server a bit about yourself..."
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors resize-none"
              />
            </div>

            {profileMsg && (
              <p className={`text-sm ${profileMsg.type === 'ok' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{profileMsg.text}</p>
            )}

            <button
              type="submit"
              disabled={profileLoading}
              className="bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-[#0a0a0f] font-bold px-6 py-2.5 rounded-lg transition-colors"
            >
              {profileLoading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-[#13131a] border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wide mb-5">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>
            {pwdMsg && (
              <p className={`text-sm ${pwdMsg.type === 'ok' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>{pwdMsg.text}</p>
            )}
            <button
              type="submit"
              disabled={pwdLoading}
              className="bg-[#2d2d36] hover:bg-[#3d3d4a] disabled:opacity-50 text-[#e8e8ea] font-bold px-6 py-2.5 rounded-lg transition-colors border border-white/10"
            >
              {pwdLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#13131a] border border-[#ef4444]/20 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-[#ef4444]/70 uppercase tracking-wide mb-3">Account</h2>
          <button
            onClick={handleSignOut}
            className="bg-[#ef4444]/10 hover:bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30 font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
