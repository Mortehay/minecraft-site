import React from 'react';

interface StatusBarProps {
  online: boolean;
  ping: number;
  playerCount?: string;
}

export function StatusBar({ online, ping, playerCount }: StatusBarProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${online ? 'bg-[#10b981]' : 'bg-[#ef4444]'} animate-pulse`} />
        <span className="text-[#e8e8ea]">{online ? 'Online' : 'Offline'}</span>
      </div>
      
      <div className="text-[#9ca3af]">
        {ping}ms
      </div>
      
      {playerCount && (
        <div className="text-[#9ca3af]">
          {playerCount}
        </div>
      )}
    </div>
  );
}
