import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../components/AuthModal';

export function SignIn() {
  const { session } = useAuth();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname ?? '/dashboard';
  const [showModal, setShowModal] = useState(true);

  if (session) return <Navigate to={from} replace />;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#10b981]/5 rounded-full blur-3xl" />
      </div>

      {showModal && (
        <AuthModal onClose={() => setShowModal(false)} />
      )}

      {!showModal && (
        <div className="text-center">
          <p className="text-[#9ca3af] mb-4">Closed. <a href="/" className="text-[#10b981]">Go home</a></p>
        </div>
      )}
    </div>
  );
}
