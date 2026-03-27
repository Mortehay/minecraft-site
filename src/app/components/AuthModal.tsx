import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

type Mode = 'signin' | 'signup' | 'forgot';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        setMessage('Check your email to confirm your account!');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#13131a] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#10b981]/20 to-transparent px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#10b981] flex items-center justify-center rounded">
              <span className="text-lg">⛏️</span>
            </div>
            <h2 className="text-lg font-bold text-[#e8e8ea]">
              {mode === 'signin' ? 'Sign In to Epic MC' : mode === 'signup' ? 'Create Account' : 'Forgot Password'}
            </h2>
          </div>
          <button onClick={onClose} className="text-[#9ca3af] hover:text-[#e8e8ea] transition-colors text-xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {message ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✉️</div>
              <p className="text-[#10b981] font-medium">{message}</p>
              <button onClick={() => setMessage(null)} className="mt-4 text-sm text-[#9ca3af] hover:text-[#e8e8ea]">Go back</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Display Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    placeholder="Steve"
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-medium text-[#9ca3af] mb-1.5 uppercase tracking-wide">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-2.5 text-[#e8e8ea] placeholder-[#4b5563] focus:outline-none focus:border-[#10b981] transition-colors"
                  />
                </div>
              )}

              {error && (
                <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg px-4 py-2.5 text-sm text-[#ef4444]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-[#0a0a0f] font-bold py-2.5 rounded-lg transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] mt-2"
              >
                {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Email'}
              </button>
            </form>
          )}

          {/* Footer Links */}
          {!message && (
            <div className="mt-5 pt-4 border-t border-white/5 text-center space-y-2">
              {mode === 'signin' && (
                <>
                  <button onClick={() => setMode('forgot')} className="block w-full text-sm text-[#9ca3af] hover:text-[#10b981] transition-colors">
                    Forgot your password?
                  </button>
                  <button onClick={() => setMode('signup')} className="block w-full text-sm text-[#9ca3af] hover:text-[#e8e8ea] transition-colors">
                    No account? <span className="text-[#10b981]">Create one</span>
                  </button>
                </>
              )}
              {mode !== 'signin' && (
                <button onClick={() => setMode('signin')} className="text-sm text-[#9ca3af] hover:text-[#e8e8ea] transition-colors">
                  ← Back to Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
