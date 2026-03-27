import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Minimum role required. 'player' = any authenticated user. 'admin' = admin only. */
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole = 'player' }: ProtectedRouteProps) {
  const { session, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#9ca3af]">Checking access…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requiredRole === 'admin' && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
