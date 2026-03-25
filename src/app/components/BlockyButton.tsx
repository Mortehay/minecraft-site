import React from 'react';

interface BlockyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function BlockyButton({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: BlockyButtonProps) {
  const baseStyles = "px-6 py-3 transition-all duration-200 border-2 active:translate-y-1";
  
  const variants = {
    primary: "bg-[#10b981] hover:bg-[#059669] text-[#0a0a0f] border-[#34d399] shadow-[0_4px_0_0_#059669] hover:shadow-[0_2px_0_0_#059669] active:shadow-none",
    secondary: "bg-[#3d3d48] hover:bg-[#2d2d36] text-[#e8e8ea] border-[#4d4d58] shadow-[0_4px_0_0_#2d2d36] hover:shadow-[0_2px_0_0_#2d2d36] active:shadow-none",
    ghost: "bg-transparent hover:bg-[#2d2d36]/50 text-[#e8e8ea] border-transparent shadow-none"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
