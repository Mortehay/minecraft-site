import React from 'react';
import { Link } from 'react-router';
import { BlockyButton } from '../components/BlockyButton';
import { GlassCard } from '../components/GlassCard';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassCard className="max-w-2xl mx-auto text-center">
        <div className="text-8xl mb-6">🚧</div>
        <h1 
          className="text-4xl mb-4 text-[#10b981]"
          style={{ fontFamily: 'var(--font-minecraft)' }}
        >
          404
        </h1>
        <h2 className="text-2xl mb-4 text-[#e8e8ea]">Page Not Found</h2>
        <p className="text-[#9ca3af] mb-8">
          Looks like you've wandered into uncharted territory. This page doesn't exist!
        </p>
        <Link to="/">
          <BlockyButton variant="primary">
            Return to Spawn
          </BlockyButton>
        </Link>
      </GlassCard>
    </div>
  );
}
