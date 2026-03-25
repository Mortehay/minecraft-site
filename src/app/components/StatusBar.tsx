import React from 'react';

interface StatusBarProps {
  online: boolean;
  ping: number;
  playerCount?: string;
}

export function StatusBar({ online, ping, playerCount }: StatusBarProps) {
  return (
    <div className="flex flex-col gap-1 text-sm ml-6">
      {/* Row 1: Status and Ping */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${online ? 'bg-[#10b981]' : 'bg-[#ef4444]'} animate-pulse`} />
          <span className="text-[#e8e8ea] font-medium">{online ? 'Online' : 'Offline'}</span>
        </div>
        
        <div className="text-[#9ca3af]">
          {ping}ms
        </div>
      </div>
      
      {/* Row 2: Player Count */}
      {playerCount !== undefined && (
        <div className="text-[#9ca3af] text-xs">
          {playerCount} players
        </div>
      )}
    </div>
  );
}
