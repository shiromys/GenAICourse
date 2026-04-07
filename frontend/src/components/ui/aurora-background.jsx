"use client";
import React from "react";

export const AuroraBackground = ({
  className = "",
  children,
  showRadialGradient = true,
  dark = false,
  beige = false,
  showBottomFade = false,
  ...props
}) => {
  return (
    <div
      className={`relative flex flex-col transition-bg ${
        beige 
          ? 'theme-beige bg-[var(--bg-main)] text-[var(--text-main)]' 
          : dark 
            ? 'bg-[#0F172A] text-slate-100' 
            : 'bg-white text-slate-900'
      } ${className}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
          ${beige
            ? '[--white-gradient:repeating-linear-gradient(100deg,var(--beige-50)_0%,var(--beige-50)_7%,transparent_10%,transparent_12%,var(--beige-50)_16%)] [--aurora:repeating-linear-gradient(100deg,#D4A373_10%,#E7D8C9_15%,#A5A58D_20%,#6B705C_25%,#D4A373_30%)]'
            : dark 
              ? '[--white-gradient:repeating-linear-gradient(100deg,#0f172a_0%,#0f172a_7%,transparent_10%,transparent_12%,#0f172a_16%)] [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#6366f1_15%,#a855f7_20%,#f43f5e_25%,#3b82f6_30%)]' 
              : '[--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)] [--aurora:repeating-linear-gradient(100deg,#4f46e5_10%,#818cf8_15%,#8b5cf6_20%,#a78bfa_25%,#6366f1_30%)]'
          }
          [background-image:var(--white-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px]
          after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
          after:[background-size:200%,_100%] 
          after:animate-aurora after:mix-blend-difference
          absolute -inset-[10px] opacity-40 will-change-transform ${
            showRadialGradient ? `[mask-image:radial-gradient(ellipse_at_100%_0%,${beige ? 'black' : dark ? '#000' : 'black'} 10%,transparent 70%)]` : ''
          }`}
        ></div>
        {showBottomFade && (
          <div className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t ${beige ? 'from-[var(--bg-main)] via-[var(--bg-main)]/80' : dark ? 'from-[#0F172A] via-[#0F172A]/80' : 'from-white via-white/80'} to-transparent z-10`} />
        )}
      </div>
      {children}
    </div>
  );
};
