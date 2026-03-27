import React from 'react';

interface InventorySlotProps {
  item?: {
    name: string;
    icon: string;
    count?: number;
  };
  onClick?: () => void;
}

export function InventorySlot({ item, onClick }: InventorySlotProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-12 h-12 bg-[#2d2d36] border-2 border-[#1a1a1f] hover:border-[#10b981] transition-colors"
      style={{
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)'
      }}
    >
      {item && (
        <>
          <div className="text-2xl">{item.icon}</div>
          {item.count && item.count > 1 && (
            <div className="absolute bottom-0 right-0 text-[10px] text-[#e8e8ea] px-1">
              {item.count}
            </div>
          )}
        </>
      )}
    </button>
  );
}
